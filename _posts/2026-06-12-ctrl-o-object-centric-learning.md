---
layout: post
title: "Paper Notes: CTRL-O — Language-Controllable Object-Centric Visual Representation Learning"
date: 2026-06-12 10:00:00
description: Reading notes on CTRL-O (CVPR 2025), a method for steering object-centric slot representations with language queries.
tags: paper-notes object-centric representation-learning
categories: technical
related_posts: false
---

A summary of [CTRL-O: Language-Controllable Object-Centric Visual Representation Learning](https://openaccess.thecvf.com/content/CVPR2025/papers/Didolkar_CTRL-O_Language-Controllable_Object-Centric_Visual_Representation_Learning_CVPR_2025_paper.pdf) (CVPR 2025).

**Main idea:** Slots in an image are abstract representations that can be learned to be biased toward specific, user-queried object representations.

## Motivation

- Object-centric representation learning lacks controllability — users can't control which slots correspond to which objects.
- Representation learning for objects is often black-boxed and doesn't offer interpretable control in real-world settings.

## Hypothesis

- Slot attention + control queries + a decoder that reconstructs DINO features will accurately learn the correct slot representation corresponding to each queried object.
- The extracted representations are useful for downstream tasks like visual question answering (VQA) and instance-controllable image generation.

## Method

**CTRL-O** uses slot attention with query conditioning and a decoder that reconstructs the DINO features of input images.

- **Slot attention** learns to align each slot with a query object representation (via a contrastive loss), outputting object → slot representation relationships.
- An **MLP decoder** learns to reconstruct DINOv2 features conditioned on the query object (via a reconstruction loss).

## Evaluation

**Object discovery and grounding**

- Metrics: adjusted Rand index, mean best overlap, binding hits.
- Datasets: COCO, Visual Genome.

**Instance-controllable image generation**

- Use the conditioned slot representation and a CLIP caption embedding to generate an object image with Stable Diffusion.

**Visual question answering**

- Slot representations from CTRL-O are combined with slots extracted from a text prompt, then fed through a transformer to answer the question.

## Results

- Beats SOTA baselines on image generation quality, instance-controllable generation, and VQA performance.
