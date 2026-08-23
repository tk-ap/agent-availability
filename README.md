# Agent Availability

Personal, local-first dashboard for tracking AI-agent capacity by project and interface.

## Current version

The app is a zero-dependency static site in `index.html`. It can be deployed directly to Vercel as a static site.

Features:
- Track project, interface, and agent separately
- Countdown to next availability
- Estimated capacity percentage
- Upcoming capacity timeline
- Add/remove interfaces
- Demo data reset
- Browser `localStorage` persistence
- No backend or account required

## Deploy to Vercel

Import `tk-ap/agent-availability` into Vercel and deploy with no build command and the repository root as the output directory. Because this is a static `index.html`, no framework configuration is required.

## Product direction

This is intentionally separate from Ailhat and ALVIRA. It is a personal operations console for deciding **which agent/interface is available, for which project, and when**.

Future iterations can add screenshot-assisted availability entry, reminders, richer project prioritization, and optional server-side persistence.