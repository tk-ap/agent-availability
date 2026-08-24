# Auto Sync UI Implementation Brief

Implement this as a product experience, not a settings panel.

## Home
1. `CAPACITY NOW` hero: aggregate usable capacity across all live sources.
2. `RECOMMENDED` card: one clear action (`USE`, `WAIT`, or `RESERVE`) with explanation.
3. `NEXT WINDOWS`: compact timeline of the next meaningful capacity returns.
4. `SOURCES`: account cards with workspace, login method, current capacity, next window, and freshness.
5. Hide raw parser/extraction details behind a source detail drawer.

## Account card
Example:

**cto.new · Ailhat**
Google · Pro trial
`● LIVE · observed 24s ago`

**0% available**
`+13% in 8h · +38% in 16h`

`WAIT` — ALVIRA gets +100% in 2h; preserve this account unless Ailhat work is urgent.

## Connection banner
For an unconnected source:

**Agent Control is not watching this account yet**
Open the supported source in a browser with the companion installed. Agent Control will detect the account automatically.

Buttons: `Install companion` / `Open source`

For a connected source:

`● Watching`  `Last observed 24s ago`  `Changes sync automatically`

## Important interaction rule
Do not make users repeatedly click Sync. The UI should communicate that synchronization is happening in the background. Keep `Sync now` available only as a secondary troubleshooting action.

## Visual hierarchy
Dark, modern, operational. High contrast for current capacity and recommendation states. Avoid decorative charts unless they answer a decision question. Use restrained accent color and status semantics; do not use purple as a default brand accent.
