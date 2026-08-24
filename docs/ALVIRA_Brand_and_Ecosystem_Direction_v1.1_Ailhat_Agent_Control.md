---
author:
- Ecosystem Reference for Agents & Engineers
date: Version 1.1 --- August 2026
title: ALVIRA Brand & Product Direction — Ailhat + Agent Control Extension
---

# Purpose

This document is the brand, product, UI, and ecosystem direction reference for ALVIRA, including the relationship between ALVIRA, Ailhat, and Agent Control.

The guiding principle is that these products may interoperate deeply without being collapsed into one undifferentiated product.

# Core ALVIRA Thesis

ALVIRA is the operating system for the AI era: it understands the user, carries context across AI tools, helps the user work, and eventually acts for them.

The ecosystem progresses through:

**Know You → Connect Everywhere → Work With You → Act For You**

- Context Engine — Understand You
- Bridge — Connect Everywhere
- Workflow Studio — Orchestrate Work
- AI Agents — Act For You

The user should experience these as a coherent system, not as unrelated utilities.

# Ailhat + Agent Control: Ecosystem Boundary

Keep Ailhat and Agent Control as separate products and market identities for now. Make them interoperable at the data and workflow level.

> **Ailhat knows what matters in your products.**
>
> **Agent Control knows what can execute the work.**
>
> **ALVIRA knows the person, company, preferences, goals, constraints, tools, and operating context connecting the system.**

## Ailhat — Product Intelligence

Ailhat owns the question:

> **What should we build, fix, or investigate next — and why?**

Ailhat should observe and interpret product/business state, including:

- product health
- bugs and regressions
- UX problems
- market gaps and opportunities
- competitive/product signals
- product readiness
- prioritized work

Ailhat should produce structured **Work Items / Product Intelligence** that can be consumed by other systems.

Ailhat should not become the authoritative system for AI-account capacity, agent quota windows, or cross-account execution availability.

## Agent Control — Execution Intelligence

Agent Control owns the question:

> **Which AI source can do this, when is it available, and where should scarce execution capacity go?**

Agent Control should observe and interpret:

- provider
- account
- workspace/interface
- agent mode
- capacity
- reset/availability windows
- source health and freshness
- reservations
- execution suitability

Agent Control should not become the authoritative source for deep product diagnosis, market intelligence, or product scanning. It may consume those signals to make better allocation decisions.

# Clean Product Boundary

| Question | System of record |
|---|---|
| What is happening to the product? | Ailhat |
| Why does it matter? | Ailhat |
| What bug/opportunity/gap exists? | Ailhat |
| What should we do next? | Ailhat |
| Which AI source can execute it? | Agent Control |
| When is that source available? | Agent Control |
| Which capacity window should be reserved? | Agent Control |
| Which agent should act? | Agent layer + Agent Control capability data |
| How should work be performed for this user/company? | ALVIRA Context + Workflow Studio |

# Shared Work Item Contract

Ailhat and Agent Control should exchange structured work rather than tightly coupling their UIs.

Example:

```yaml
work_item:
  id: stable-work-item-id
  source: ailhat
  product: Ailhat
  title: Restore production reliability and auth
  type: reliability
  priority: P0
  description: Verify deployment integrity and restore the customer-ready login path.
  rationale: Unblocks real customer validation.
  estimated_effort_minutes: 90
  required_capabilities:
    - coding
    - repository_access
  preferred_providers:
    - cto.new
  launch_impact: 12-18
  evidence:
    - source-url-or-observation
  status: ready
```

Agent Control may enrich the work item with:

```yaml
execution:
  matched_source: cto.new / account / workspace
  availability: 47m
  expected_capacity: 38%
  reservation_status: recommended
  suitability: high
  estimated_execution_window: 60-90m
```

Do not duplicate the entire intelligence model of the other product merely to render a card.

# Ecosystem Loop

The preferred long-term loop is:

**ALVIRA Context → Ailhat understands product → Work Item → Agent Control allocates capacity → Agent executes → Result → Ailhat rescans → ALVIRA learns context**

This creates a compounding loop aligned with the ALVIRA flywheel:

**Better Understanding → More Relevant Context → More Automated Work → Better Outcomes → More Trust → More Adoption → More Context → Better Understanding**

# Role of ALVIRA Context

Ailhat should be able to use relevant ALVIRA context when generating product recommendations, while respecting permissions and provenance.

Agent Control should be able to use relevant ALVIRA context when making allocation recommendations, such as:

- user priorities
- project importance
- constraints
- preferred tools
- preferred workflows
- work style
- goals

ALVIRA remains the owner of user/company context. Neither Ailhat nor Agent Control should silently become a parallel universal profile system.

# Product Readiness Boundary

Ailhat may assess **product/market readiness** and generate evidence-backed recommendations.

Agent Control may surface **execution readiness**, such as:

- whether a suitable agent is available
- whether the required capacity window exists
- whether the work is adequately specified for execution
- whether the next agent window should be reserved

Agent Control may summarize product readiness when useful for allocation, but should treat deep product intelligence as an input rather than recreate Ailhat's scanning and diagnosis engine.

# Visual / Brand Relationship

Ailhat and Agent Control may use distinct visual identities because they serve different operational roles.

The ALVIRA ecosystem should still feel coherent at the conceptual and interaction-contract level.

Do not:

- make Agent Control look like an ALVIRA sub-screen by default
- force Ailhat product intelligence into ALVIRA's primary UI
- create disconnected branding that prevents interoperability
- introduce arbitrary visual complexity solely to signal "AI"
- merge the two products merely because they exchange data

Agent Control's current gold/amber command-center language is compatible with its execution-capacity role and should remain distinct from ALVIRA's core identity.

# Product Anti-Patterns

Avoid:

- an Ailhat clone inside Agent Control
- an Agent Control clone inside Ailhat
- duplicate product scans in Agent Control
- duplicate agent-capacity dashboards in Ailhat
- hardcoded product-specific logic where a portfolio/work-item model is appropriate
- invented readiness scores when evidence is insufficient
- opaque cross-product data sharing without provenance or user control

# Agent / Engineering Rules

When adding a feature that touches both products:

1. Identify which product owns the source-of-truth data.
2. Prefer a structured contract over UI coupling.
3. Preserve provenance and freshness of imported data.
4. Never invent business/product readiness scores without evidence.
5. Keep credentials, cookies, and session secrets out of shared product data.
6. Allow each product to remain independently useful.
7. Strengthen the end-to-end loop without erasing product boundaries.

# Strategic North Star

The ecosystem should ultimately feel like a coordinated system:

> **ALVIRA knows you.**
>
> **Ailhat knows what matters.**
>
> **Agent Control knows what can execute.**
>
> **Workflow Studio orchestrates the work.**
>
> **Agents act.**

The products should compound one another without becoming interchangeable.
