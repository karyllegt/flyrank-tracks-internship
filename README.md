# FlyRank Tracks Internship

This repository organizes internship work by learning track.

## Tracks

- `tracks/frontend-ai-engineering` - active track and capstone workspace
- `tracks/general-ai-fluency` - optional AI fluency work
- `tracks/machine-learning` - machine learning work

## Frontend AI Engineering

The active track starts in `tracks/frontend-ai-engineering`. The project is intentionally small while the capstone direction is being finalized.

## Conventions

See [CLAUDE.md](./CLAUDE.md) for stack and contribution conventions.

## FE-07 tool contract

The chat route exposes the `audit_workspace` server-side tool in
`app/api/chat/tools.ts`. Its Zod input schema is:

```ts
{ focus: string; includeRecommendations: boolean }
```

The tool returns a typed workspace audit with `focus`, `score`, `findings`, and
`recommendations`. The chat UI renders `input-streaming`, `input-available`,
`output-available`, and `output-error` as distinct states. Try a prompt such as
“audit accessibility” in the live chat to demonstrate the tool lifecycle.

## FE-08 failure-state checkpoint

The chat accepts `fail`, `sabotage`, `429`, or `rate limit` as a deliberate
test prompt. The route emits an interrupted-stream error event, and the client
keeps the partial response with a retry action. The global route boundary in
`app/error.tsx` provides recovery for render failures, while the initial chat
screen is an actionable empty state.

## FE-09 testing pass

Run `npm test` for the six typed tool-contract tests and `npm run test:e2e`
against a running local app. GitHub Actions runs both the unit suite and the
Playwright smoke flow on pushes to `master` and pull requests.

## First assignment

The Frontend AI Engineering starter includes a semantic HTML page, accessible interaction, and track-local conventions for iterative work.
