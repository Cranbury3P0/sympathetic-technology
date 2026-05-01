---
title: "Designing AI to flag what it does not know"
date: 2026-03-14
excerpt: "The most useful thing an AI tool can do in a high-stakes environment
  is tell you when it is not confident. Most are not designed to do that."
category: "Governance"
tags:
  - Governance
  - Tool Design
author: "Sean Cranbury"
read_time: "5 min read"
cover_image: "/images/journal/uncertainty-cover.jpg"
cover_alt: "Sunlight through a moss-covered forest"
credits: "Photo: Jesse Bauer"
status: published
---

There is a failure mode in AI tools that organizations rarely discuss in enough detail. It is not hallucination exactly, though that is part of it. It is the tendency of language models to respond with the same fluent confidence whether they are on solid ground or not.

Ask a model a question it can answer reliably and it sounds authoritative. Ask it a question where the training data is sparse, outdated, or contested, and it sounds exactly the same. The surface signal is identical. The reliability is not.

For most consumer uses this is an annoyance. For organizations making policy decisions, providing regulatory analysis, or producing communications that carry institutional weight, it is a design problem worth solving.

## What flagging uncertainty actually looks like

The good news is that this is a solvable problem at the implementation level, not just a limitation of the underlying technology.

A well-designed organizational AI tool can be instructed to distinguish between three types of response: answers it can ground in specific documents from your knowledge base, answers it is drawing from general training data without a specific source, and answers where it does not have sufficient information to respond reliably.

That third category is the one most tools skip. Building it in requires deliberate prompt design, retrieval architecture that tracks source provenance, and interface design that surfaces confidence levels in a way staff can actually act on.

None of this eliminates the need for human review. It makes human review more targeted. Instead of reviewing every output, a staff member can focus attention on the outputs the system has flagged as uncertain.

## Why organizations resist building this in

The pressure on AI product design runs in the opposite direction. A tool that flags uncertainty frequently looks less capable than a tool that answers everything confidently. In a competitive demo, confident and wrong often beats uncertain and honest.

Organizations procuring AI tools rarely have the technical knowledge to ask whether the system is calibrated to flag its own limitations. They tend to evaluate on the quality of good outputs rather than the handling of bad ones.

Building flagging into your own governed AI environment means you can prioritize institutional reliability over the appearance of capability. For organizations that have to defend their outputs to a board, to members, or to a regulator, that is a meaningful difference.
