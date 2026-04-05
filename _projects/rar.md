---
layout: page
title: "RAR: Recovery from Misalignment via Iterative Fine-Tuning"
description: NLP final project · Measuring LLM safety alignment degradation and recovery
importance: 4
category: coursework
---

**NLP Final Project** — Nov–Dec 2025

Designed **Re-Alignment Resilience (RAR)**, a longitudinal study measuring how safety alignment in LLMs degrades and recovers under iterative fine-tuning.

- Induced misalignment in **LLaMA-2-7B-Chat** via toxic fine-tuning (ToxiGen) and performed iterative re-alignment using LoRA with Alpaca and Anthropic HH-RLHF data, tracking recovery trajectories across 10–20 stages
- Focused on toxicity, factuality, and adversarial robustness as alignment dimensions
- Evaluated using **RealToxicityPrompts**, **TruthfulQA**, **AdvBench**, and **GSM8K**, analyzing whether safety metrics converge, plateau, or exhibit phase-transition failures
