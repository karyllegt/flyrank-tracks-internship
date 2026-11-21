# Capstone specification

## Direction

FlyRank Workspace is a lightweight frontend workspace for organizing track progress and verifying project health.

## Core screens

- Home: explain the workspace and current focus.
- Dashboard: summarize progress and future assignment work.
- Settings: provide a small accessible interaction for profile preferences.
- Health: fetch and display public repository health data.

## Technical choices

- Next.js App Router with TypeScript.
- Static export for a public preview deployment.
- CSS custom properties for shared design tokens.
- Client-side fetch for the public GitHub health check.

## Constraints

- No secrets are stored in the repository.
- Routes must work at narrow mobile and desktop widths.
- Interactive controls must have labels and live status feedback.
