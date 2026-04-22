---
layout: page
title: Diffusion-Generated Data with Curriculum Learning
description: Deep Learning final project · EDM diffusion pipeline for CIFAR-100 augmentation
importance: 3
category: coursework
github: spei04/dl_project
---

**Deep Learning Final Project** — Nov–Dec 2025

Investigated whether diffusion-generated synthetic data can improve classification performance when combined with curriculum learning strategies.

- Built an **EDM diffusion-based pipeline** to generate class-conditional synthetic CIFAR-100 images with classifier-free guidance, enabling controllable mixing of real and synthetic data with targeted augmentation of hard classes
- Fine-tuned ResNet-18 models under multiple synthetic/real and curriculum-style training regimes
- Evaluated overall and per-class accuracy to study the impact of diffusion-generated data on classification performance
