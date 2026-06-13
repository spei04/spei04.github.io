---
layout: post
title: "Building a Vertical Agent"
date: 2026-06-12 14:00:00
description: Notes on structuring a vertical agent's context like CPU cache levels — trading information compression against speed of discovery.
tags: agents llm context-engineering
categories: technical
related_posts: false
---

Some notes on designing a vertical agent: one with a fixed environment and a fixed model, where the system's behavior is design-dependent — driven by the system prompt, tools, and artifacts (skills, curated docs, references).

## The core problem

Accuracy depends on context quality. The agent has to handle a long-tailed distribution of problems: a few very popular topics, plus a large number of unique or rare prompts.

There's a fundamental tradeoff: **compression of information vs. speed of discovery.**

There's also a cost to piling on tools: model accuracy degrades as the number of tools increases.

- More tools add more schema.
- More schema means more confusion.
- More options means more ways to pick the wrong tool.

## Agent structure (mirrors CPU cache levels)

```
       +--------------------------------------------------+
 L1    |  ALWAYS RESIDENT - tiny, instant.                |
       |  The 80%. Lives in the system prompt.            |
       +--------------------------------------------------+
                 |  miss -> one cheap call
                 v
       +-------------------------------------------------------+
 L2    |  ON DEMAND - curated English specs.                   |
       |  The next ~15%. One discovery step to load.           |
       +-------------------------------------------------------+
                 |  miss -> read the skill, then search
                 v
       +--------------------------------------------------+
 L3    |  ESCAPE HATCH - the raw API tome.                |
       |  The long tail. 3-6 grep calls to mine.          |
       +--------------------------------------------------+
```

### L1 — Always resident

Tiny, instant, and lives in the system prompt forever. Operations get feature-engineered, token-compressed, and wrapped with consequence-reporting.

- Expensive to build.
- The agent pays the cost on every task.
- Example: reading and writing cells.

### L2 — Curated English on demand

The next ~15%, loaded with one discovery step.

- Including it in the system prompt would bloat tasks that don't use it.
- Zero cost until the task needs it.
- The console log is the cache miss → it adds the relevant skill into the prompt.

### L3 — Escape hatch

The long tail: unanticipated cases the agent still needs to handle.

- The complete raw API — "if the wrapped API can't do it, use the raw API."
- Machine-generated reference.
- Unusable as prompt context; mined with 3–6 grep calls.

## Applying the model: a financial reporting agent

The same three levels map cleanly onto a domain agent for financial reporting.

### L1 — Always-resident reporting context

The small permanent prompt: how to behave, what "good" reporting work means, source-backed answers, no invented support, audit-ready outputs, SCF focus, SEC/ASC awareness.

- Always in the system prompt.
- Concise behavior rules.
- Source-backed reporting standards.
- Do not use validation answer files as customer truth.
- Know when to ask for missing support.

### L2 — On-demand curated reporting skills

Not raw rules — practical workflow specs: "how to generate SCF," "how to draft a 10-Q footnote," "how to inspect source evidence," "how to analyze ASC 606 contract booking." They should encode recipes, gotchas, required inputs, outputs, and review checks.

Loaded only when routed:

- SCF generation playbook
- SEC filing draft playbook
- ASC/SEC rule research playbook
- Source evidence inspector playbook
- Contract accounting playbook
- Review and validation playbook

### L3 — Raw knowledge base / escape hatch

The full ASC, SEC, company uploads, workbooks, contracts, policies, and prior artifacts. The agent searches this only when needed, retrieves precise excerpts, and cites them.

- ASC/SEC knowledge base
- User-uploaded files
- Company policies
- Uploaded contracts
- Prior generated artifacts
- Source-linked workbooks

**The moat:** tedious, domain-specific compression — better spreadsheet parsing, better rule retrieval, better source traces, better validation loops, and better workflow-specific context.

## The full LLM context

1. Permanent reporting system prompt
2. Selected L2 skill spec, if any
3. Retrieved ASC/SEC excerpts, only if needed
4. Retrieved user/company/session context
5. Current user question
