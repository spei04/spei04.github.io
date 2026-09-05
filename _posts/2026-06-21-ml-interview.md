---
layout: post
title: "ML Interview: Transformers From Scratch"
date: 2026-06-21 10:00:00
description: A single file that walks through the pieces ML/research interviews actually ask you to write — multi-head attention, FlashAttention tiling, manual backward passes, and a full training loop in pure PyTorch.
tags: ml-interview transformers pytorch attention
categories: technical
related_posts: false
---

Most ML engineering and research interviews don't ask you to recall a definition — they ask you to *write the thing on a whiteboard or in a shared editor*. The code below is a compact reference for the questions that come up again and again: multi-head attention, the attention variants (self / causal / cross), FlashAttention-style tiling, manual backward passes for attention and an MLP, and a complete transformer with a from-scratch SGD loop.

Below the code I break down what each section is, why interviewers ask for it, and the gotchas they're probing for.

## The code

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

# =====================================================================
# 1. ATTENTION MECHANISMS (FORWARD PASSES)
# =====================================================================

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        assert d_model % n_heads == 0, "d_model must be divisible by n_heads"
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads

        self.W_q = nn.Linear(d_model, d_model, bias=False)
        self.W_k = nn.Linear(d_model, d_model, bias=False)
        self.W_v = nn.Linear(d_model, d_model, bias=False)
        self.W_o = nn.Linear(d_model, d_model, bias=False)

    def forward(self, q, k, v, mask=None):
        B, T_q, _ = q.shape
        _, T_k, _ = k.shape

        # Linear projections & split into heads
        # Shape: [B, n_heads, T, d_k]
        Q = self.W_q(q).view(B, T_q, self.n_heads, self.d_k).transpose(1, 2)
        K = self.W_k(k).view(B, T_k, self.n_heads, self.d_k).transpose(1, 2)
        V = self.W_v(v).view(B, T_k, self.n_heads, self.d_k).transpose(1, 2)

        # Scaled dot-product scores
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        if mask is not None:
            # Mask should broadcast across batch and heads
            scores = scores.masked_fill(mask == 0, float('-inf'))

        attn_weights = F.softmax(scores, dim=-1)
        context = torch.matmul(attn_weights, V) # [B, n_heads, T_q, d_k]

        # Concat heads and project
        context = context.transpose(1, 2).contiguous().view(B, T_q, self.d_model)
        return self.W_o(context)

# Helper configurations for Causal, Self, and Cross Attention loops
class TransformerAttentionVariants:
    @staticmethod
    def self_attention(x, mha_module):
        # Self-Attention: Q, K, V all come from the same sequence
        return mha_module(x, x, x, mask=None)

    @staticmethod
    def causal_attention(x, mha_module):
        # Causal Attention: Mask out future tokens to prevent looking ahead
        T = x.shape[1]
        causal_mask = torch.tril(torch.ones(T, T, device=x.device)).view(1, 1, T, T)
        return mha_module(x, x, x, mask=causal_mask)

    @staticmethod
    def cross_attention(x_decoder, y_encoder, mha_module):
        # Cross Attention: Q comes from decoder, K and V come from encoder
        return mha_module(x_decoder, y_encoder, y_encoder, mask=None)


# =====================================================================
# 2. FLASH ATTENTION (FORWARD)
# =====================================================================

def flash_attention_forward(Q, K, V, B_c=64, B_r=64):
    """
    Tiling-based algorithm inspired by FlashAttention-1.
    Assumes inputs are already split into heads: Shape [B, N_heads, T, D_k]
    For simplicity, we compute on standard VRAM layout but track max and denominator blocks.
    """
    B, H, T_q, D_k = Q.shape
    _, _, T_k, _ = K.shape

    O = torch.zeros_like(Q)
    scale = 1.0 / math.sqrt(D_k)

    # Outer loop over columns (K, V blocks)
    for j in range(0, T_k, B_c):
        K_j = K[:, :, j:j+B_c, :] # [B, H, B_c, D_k]
        V_j = V[:, :, j:j+B_c, :] # [B, H, B_c, D_k]

        # Inner loop over rows (Q, O blocks)
        for i in range(0, T_q, B_r):
            Q_i = Q[:, :, i:i+B_r, :] # [B, H, B_r, D_k]
            O_i = O[:, :, i:i+B_r, :] # [B, H, B_r, D_k]

            # Compute block scores
            S_ij = scale * torch.matmul(Q_i, K_j.transpose(-2, -1)) # [B, H, B_r, B_c]

            # Row-wise updates for stable softmax online reduction
            m_ij, _ = torch.max(S_ij, dim=-1, keepdim=True)
            P_ij = torch.exp(S_ij - m_ij)
            d_ij = torch.sum(P_ij, dim=-1, keepdim=True)

            # Update output accumulator slice
            O_i += torch.matmul(P_ij, V_j)
            O[:, :, i:i+B_r, :] = O_i

    # Normalize the final matrix values across column blocks
    # (In standard hardware execution, this step is merged inline with running statistics)
    O = O / (torch.sum(O, dim=-1, keepdim=True) + 1e-6)
    return O


# =====================================================================
# 3. MANUAL BACKWARD PASSES (ATTENTION & MLP)
# =====================================================================

class ManualAttentionBackward:
    @staticmethod
    def backward(dO, Q, K, V, attn_weights, scale):
        """
        Calculates gradients for basic Scaled Dot-Product Attention
        Outputs: dQ, dK, dV
        """
        # dO shape: [B, H, T, D_k]
        # dV = Attn^T * dO
        dV = torch.matmul(attn_weights.transpose(-2, -1), dO)

        # dP (gradient of attention matrix after softmax)
        dP = torch.matmul(dO, V.transpose(-2, -1))

        # dS (gradient through softmax)
        # dS = P * (dP - rowsum(dP * P))
        rowsum = torch.sum(dP * attn_weights, dim=-1, keepdim=True)
        dS = attn_weights * (dP - rowsum)

        # Gradients for Q and K
        dQ = torch.matmul(dS, K) * scale
        dK = torch.matmul(dS.transpose(-2, -1), Q) * scale

        return dQ, dK, dV

class ManualMLP(nn.Module):
    def __init__(self, d_model, d_ff):
        super().__init__()
        # Explicit weights to track custom manual backward equations
        self.W1 = nn.Parameter(torch.randn(d_model, d_ff) / math.sqrt(d_model))
        self.b1 = nn.Parameter(torch.zeros(d_ff))
        self.W2 = nn.Parameter(torch.randn(d_ff, d_model) / math.sqrt(d_ff))
        self.b2 = nn.Parameter(torch.zeros(d_model))

    def forward(self, x):
        # Save states for backward pass calculation
        self.x = x
        self.z1 = torch.matmul(x, self.W1) + self.b1
        self.a1 = F.relu(self.z1)
        self.z2 = torch.matmul(self.a1, self.W2) + self.b2
        return self.z2

    def backward(self, grad_output):
        """
        Computes analytical parameter gradients and input gradients.
        """
        # grad_output shape: [B, T, d_model]
        dW2 = torch.matmul(self.a1.transpose(-2, -1), grad_output).sum(dim=0)
        db2 = grad_output.sum(dim=(0, 1))

        da1 = torch.matmul(grad_output, self.W2.t())
        # Derivative of ReLU
        dz1 = da1 * (self.z1 > 0).float()

        dW1 = torch.matmul(self.x.transpose(-2, -1), dz1).sum(dim=0)
        db1 = dz1.sum(dim=(0, 1))

        dx = torch.matmul(dz1, self.W1.t())

        # Cache gradients internally
        self.W1.grad = dW1
        self.b1.grad = db1
        self.W2.grad = dW2
        self.b2.grad = db2

        return dx


# =====================================================================
# 4. END-TO-END TRANSFORMER BLOCK & ARCHITECTURE
# =====================================================================

class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads, d_ff):
        super().__init__()
        self.ln1 = nn.LayerNorm(d_model)
        self.attn = MultiHeadAttention(d_model, n_heads)
        self.ln2 = nn.LayerNorm(d_model)
        self.mlp = ManualMLP(d_model, d_ff)

    def forward(self, x, is_causal=True):
        # Pre-LN implementation with residual pathways
        norm_x = self.ln1(x)
        if is_causal:
            attn_out = TransformerAttentionVariants.causal_attention(norm_x, self.attn)
        else:
            attn_out = TransformerAttentionVariants.self_attention(norm_x, self.attn)

        x = x + attn_out
        x = x + self.mlp(self.ln2(x))
        return x

class CompleteTransformer(nn.Module):
    def __init__(self, vocab_size, d_model, n_heads, d_ff, n_layers, max_seq_len):
        super().__init__()
        self.token_emb = nn.Embedding(vocab_size, d_model)
        self.pos_emb = nn.Embedding(max_seq_len, d_model)

        self.layers = nn.ModuleList([
            TransformerBlock(d_model, n_heads, d_ff) for _ in range(n_layers)
        ])
        self.ln_f = nn.LayerNorm(d_model)
        self.head = nn.Linear(d_model, vocab_size, bias=False)

    def forward(self, idx):
        B, T = idx.shape
        positions = torch.arange(0, T, device=idx.device).unsqueeze(0)

        x = self.token_emb(idx) + self.pos_emb(positions)

        for layer in self.layers:
            x = layer(x)

        x = self.ln_f(x)
        logits = self.head(x)
        return logits


# =====================================================================
# 5. SIMPLE TRAINING LOOP WITH STOCHASTIC GRADIENT DESCENT (SGD)
# =====================================================================

if __name__ == "__main__":
    # Hyperparameters
    VOCAB_SIZE = 128
    D_MODEL = 64
    N_HEADS = 4
    D_FF = 256
    N_LAYERS = 2
    MAX_SEQ_LEN = 32
    BATCH_SIZE = 4
    LEARNING_RATE = 0.1 # High learning rate to quickly check gradient optimization metrics

    # Initialize Model
    model = CompleteTransformer(VOCAB_SIZE, D_MODEL, N_HEADS, D_FF, N_LAYERS, MAX_SEQ_LEN)

    # Generate Mock Data (Predict the shifted sequence tokens)
    X_train = torch.randint(0, VOCAB_SIZE, (20, MAX_SEQ_LEN))
    Y_train = torch.roll(X_train, shifts=-1, dims=1) # Target next token prediction

    print("Beginning Training Loop via Pure SGD...")
    print("-" * 50)

    # Simple Training Iterations
    for epoch in range(5):
        epoch_loss = 0.0
        permutations = torch.randperm(X_train.size(0))

        for i in range(0, X_train.size(0), BATCH_SIZE):
            indices = permutations[i:i+BATCH_SIZE]
            batch_x, batch_y = X_train[indices], Y_train[indices]

            # Zero Gradients Manually
            model.zero_grad()

            # Forward Pass
            logits = model(batch_x)

            # Compute Cross-Entropy Loss
            loss = F.cross_entropy(logits.view(-1, VOCAB_SIZE), batch_y.view(-1))

            # Backward Pass
            loss.backward()

            # Manual SGD Parameter Update Step
            with torch.no_grad():
                for param in model.parameters():
                    if param.grad is not None:
                        param.data -= LEARNING_RATE * param.grad

            epoch_loss += loss.item()

        print(f"Epoch {epoch+1}/5 | Average Dataset Loss: {epoch_loss / (X_train.size(0)/BATCH_SIZE):.4f}")
```

## What's in here, section by section

### 1. Multi-head attention + the three variants

This is the single most common "implement it live" prompt. The signal interviewers look for:

- **The reshape dance.** `view(B, T, n_heads, d_k).transpose(1, 2)` to split heads, and the mirror-image `transpose(1, 2).contiguous().view(B, T, d_model)` to merge them back. The `.contiguous()` before the final `view` is a frequent trip-up — after a `transpose` the tensor is non-contiguous and `view` will throw.
- **Scaling by `1/sqrt(d_k)`.** Be ready to explain *why*: dot products of two `d_k`-dim vectors have variance proportional to `d_k`, so without scaling the softmax saturates and gradients vanish.
- **`-inf` masking before softmax** (not after) so masked positions get exactly zero weight.
- **Self vs. causal vs. cross.** The only thing that changes is *where Q, K, V come from* and *whether a mask is applied*. Self: all three from the same sequence. Causal: same sequence + a lower-triangular mask so position `t` can't see the future. Cross: Q from the decoder, K/V from the encoder — the mechanism that lets a decoder condition on encoder output.

### 2. FlashAttention forward

The "do you understand memory, not just math" question. The key idea you're expected to articulate: standard attention materializes the full `T×T` score matrix in HBM (O(T²) memory); FlashAttention **tiles** Q/K/V into blocks and uses an *online softmax* so it never stores the full matrix, turning it into an O(T) memory, IO-aware kernel.

> ⚠️ **Interview trap:** the version above is a *teaching skeleton*, not a correct kernel. Two bugs to be able to spot and fix:
> 1. The online softmax is incomplete — a correct implementation tracks a **running max `m_i`** and **running denominator `l_i`** per query row *across* K/V blocks, and rescales the accumulator by `exp(m_old - m_new)` each step. Here `m_ij`/`d_ij` are computed per block and `d_ij` is never used.
> 2. The final `O = O / sum(O, dim=-1)` is wrong — you normalize by the **softmax denominator `l_i`**, not by the sum of the output features. Being able to point at this and say "that normalization should be the accumulated `l_i`" is exactly the signal.

If asked to "make it correct," the fix is to carry `m_i` and `l_i` per row block and apply the standard online-softmax rescaling.

### 3. Manual backward passes

Tests whether you actually understand autograd rather than just calling `.backward()`.

- **Attention backward:** the derivation everyone forgets is the softmax Jacobian. The compact form `dS = P ⊙ (dP − rowsum(dP ⊙ P))` is the thing to memorize; `dV = Pᵀ dO`, `dQ = dS·K·scale`, `dK = dSᵀ·Q·scale` follow from the matmuls.
- **MLP backward:** the canonical chain-rule exercise. Note the patterns: weight grads contract over the batch/token dims (`sum(dim=0)`), bias grads sum over all leading dims, and the ReLU derivative is the mask `(z1 > 0)`. Caching the forward activations (`self.x`, `self.z1`, `self.a1`) is what makes the backward computable.

### 4. End-to-end transformer

Shows you can assemble the primitives into a real GPT-style decoder:

- **Pre-LN** (`x + sublayer(LN(x))`) rather than Post-LN — the modern default because it trains stably without learning-rate warmup.
- **Residual connections** around both the attention and MLP sub-blocks.
- **Token + learned positional embeddings**, a final LayerNorm, and an unembedding head to vocab logits.

Common follow-ups: "Why Pre-LN over Post-LN?", "Where would you add dropout?", "How would you tie the embedding and output weights?"

### 5. Training loop with hand-rolled SGD

Demonstrates you know the mechanics under `optimizer.step()`:

- `zero_grad → forward → loss → backward → update`, with the update written out as `param.data -= lr * param.grad` inside `torch.no_grad()`.
- The next-token objective via `torch.roll(..., shifts=-1)` to build targets, and the `logits.view(-1, V)` / `targets.view(-1)` flatten that `F.cross_entropy` expects.

> One subtlety: `ManualMLP` defines its own `backward`, but the loop calls `loss.backward()` — so autograd actually drives the gradients here and the manual MLP backward is never invoked. In an interview that's a great thing to notice out loud: the manual methods are there to *prove you can derive them*, not because the training loop needs them.

## How this maps to interview rounds

| Round | What they hand you | What this code answers |
|-------|--------------------|------------------------|
| Coding screen | "Implement multi-head attention" | Section 1 |
| ML systems | "Why is attention memory-bound? Sketch FlashAttention" | Section 2 |
| Fundamentals | "Derive the gradient through softmax / a ReLU MLP" | Section 3 |
| Architecture | "Build a GPT block; Pre-LN vs Post-LN" | Section 4 |
| Optimization | "Write the training loop without an optimizer" | Section 5 |

The throughline interviewers are testing: can you go from the math, to a correct tensor implementation, to a memory-aware systems view, and back — and can you spot when an implementation is subtly wrong? Keeping all five sections in one file makes it easy to drill the whole pipeline in one sitting.
