# CTO.new Account Portfolio

## Purpose

Agent Control must treat the user's `tk.ashwood@outlook.com` cto.new account as a **portfolio capacity source**, not merely as the owner of the currently selected workspace.

The user has other live businesses/projects in this account that have not received significant work recently. They must remain visible, monitored, and eligible for recommended work.

## Known live portfolio currently in scope

These are the currently known live workspaces/projects connected to the user's broader environment. Do not invent readiness scores when evidence is missing.

| Product / workspace | Current state | Readiness | Default action |
|---|---|---:|---|
| Ailhat | Active / private beta / pre-launch | ~65% | Prioritize launch blockers |
| Ledgato | Live, insufficiently assessed | Needs assessment | Run product assessment + live scan |
| ALVIRA | Live / strategic ecosystem | Needs assessment | Assess ecosystem state and highest-value next action |
| ALVIRA Bridge | Live / strategic ecosystem component | Needs assessment | Assess reliability, adoption, and next product milestone |
| Hoopdash | Live project detected in hosting portfolio | Needs assessment | Confirm product/business status, then scan |

If additional live cto.new businesses are discovered by a connected source, they should be added automatically rather than hidden.

## Non-neglect policy

A live product should never disappear merely because the user has not worked on it recently.

Each product should have:

- last meaningful work date
- last live scan date
- current product status
- readiness assessment status
- days since attention
- next recommended review date
- next best action
- estimated agent effort
- business/launch impact

### Neglect signal

Flag a product when:

- it is live, AND
- it has not received meaningful attention for a configurable period (default 7 days), OR
- its live scan is stale, OR
- a known blocker has remained unresolved.

Suggested UI states:

- `ACTIVE`
- `NEEDS ATTENTION`
- `STALE`
- `BLOCKED`
- `HEALTHY`
- `NEEDS ASSESSMENT`

## Allocation rule

Agent Control must balance:

`launch impact × business value × urgency × neglected-time penalty × agent fit`

A neglected but strategically valuable product should periodically surface even when another product has the highest immediate launch readiness.

The system should avoid letting Ailhat consume 100% of recommendations simply because it is currently the best-assessed product.

## Product portfolio UI

Home should show a compact portfolio field with every live product represented as a node.

Work should show a portfolio-level queue and a per-product section:

1. what this product is
2. current state
3. last attention
4. next scan
5. next recommended action
6. why it matters
7. estimated agent window

Products with incomplete context should say `NEEDS ASSESSMENT`, never fabricated percentages.

## Ailhat integration

Ailhat is the product-intelligence system. Agent Control should consume its findings where available, then add execution-capacity context.

Agent Control asks:

> What product needs attention, and which AI capacity should receive it?

Ailhat asks:

> What matters in the product and why?

Shared work should follow the ecosystem work-item contract documented in the ALVIRA ecosystem direction.

## Agent behavior

When a new live product is discovered:

1. Add it to the portfolio.
2. Record the source (`cto.new`, Vercel, GitHub, browser companion, etc.).
3. Do not assign a readiness score until assessed.
4. Queue a lightweight assessment/scan.
5. Include the product in neglect monitoring.
6. Rebalance recommendations after assessment.
