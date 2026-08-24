# Product Readiness Operating Model

## Purpose

Agent Control should answer three questions for every workspace:

1. What is this product/company?
2. What state is it in?
3. How far is it from launch / a first paid client?

This is an operating model, not a promise of revenue or a precise forecast.

## Workspace summary

### Ailhat

**What it is:** AI product intelligence and market-gap detection platform that continuously scans a product, identifies bugs and unmet market opportunities, and turns those findings into prioritized work for AI coding agents.

**Current stage:** Private beta / pre-launch.

**Current working readiness estimate:** ~65%.

**Confidence:** Medium.

## Readiness dimensions

- Product: 82%
- Infrastructure: 72%
- Authentication: 60%
- Intelligence / scanning: 65%
- UX: 75%
- Billing: 30%
- GTM / customer validation: 20%

These are directional estimates and must be recalculated as evidence changes.

## First paid client estimate

Display as an approximate distance, never as a guaranteed date or probability.

Current directional estimate: **~4–8 meaningful work sessions** to reach a credible first-customer-ready state.

Primary remaining blockers:

1. Production reliability
2. Authentication reliability
3. Complete live scanning loop
4. Opportunity → actionable work pipeline
5. Clear customer-facing value proposition
6. Billing / onboarding
7. First-customer validation workflow

## Work prioritization model

Rank work using:

`agent availability × launch impact × customer value × urgency`

The system should recommend the next available agent window for the highest-value launch blocker rather than simply showing raw capacity.

Example:

> Ailhat is ~65% launch-ready. The next high-value agent window should be reserved for production/auth verification because it unlocks reliable customer validation. Completing the recommended sequence could materially improve readiness.

Do not fabricate an exact readiness delta unless the system has evidence for it. Use qualitative impact (HIGH / MEDIUM / LOW) when an exact estimate cannot be justified.

## Required Work-tab experience

For every workspace show:

- Product/company summary
- Current stage
- Launch readiness percentage
- Confidence
- First-paid-client distance
- Primary blockers
- Next 3 actions
- Recommended agent/provider
- Recommended capacity window
- Estimated effort
- Launch impact
- Customer impact
- Evidence / last scan timestamp

The Work tab should answer: **"What should I do next, and why does it matter for launch?"**

## Home-screen summary

The immersive command center should expose a compact version:

**AILHAT · 65% TO LAUNCH**

`Product 82 · Infra 72 · Intelligence 65 · Billing 30 · GTM 20`

**First paid client:** ~4–8 meaningful work sessions · Medium confidence.

The detailed explanation belongs in Work.

## Important product principle

Agent Control is evolving from an agent-availability tracker into an **AI work allocation and product-launch operating system**.

The loop is:

**Scan workspace → understand state → identify bugs/gaps → create prioritized work → monitor agent capacity → recommend the right agent/window → execute → rescan → update readiness.**
