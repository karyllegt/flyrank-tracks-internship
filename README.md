# FlyRank Tracks Internship

This repository organizes internship work by learning track.

## Tracks

- `tracks/frontend-ai-engineering` - active track and capstone workspace
- `tracks/general-ai-fluency` - optional AI fluency work
- `tracks/machine-learning` - machine learning work

## Frontend AI Engineering

The active track starts in `tracks/frontend-ai-engineering`. The deployed
capstone is a dark, responsive workspace with streaming chat, a typed audit
tool, recovery states, and a production health route.

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

## Production setup

```bash
npm ci
npm run dev
```

For a production server:

```bash
VERCEL=1 npm run build
VERCEL=1 npm run start
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | Vercel only | Server-side model access for non-tool chat |
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages only | Static deployment base path |

The app uses Next.js App Router. `app/chat/page.tsx` owns the accessible
streaming client, `app/api/chat/route.ts` owns the server proxy and abuse
limits, and `app/api/chat/tools.ts` defines the Zod-validated
`audit_workspace` tool. Tool events are sent as SSE and rendered as typed
input, output, and error states.

Production protections include a 20-message history cap, a 2,000-character
message cap, a lightweight per-forwarded-IP request window, and a 30-second
route duration limit. The in-memory limiter is intentionally conservative for
the single-instance demo; a multi-instance deployment should move this
counter to shared storage.

## How AI tools built this

AI assistance was used for initial component scaffolding, route wiring, and
test-case suggestions. Every generated change was manually reviewed, built,
run against the live preview, and corrected where needed. In particular, the
tool lifecycle, retry behavior, server-only secret handling, deployment mode
split, and audit measurements were verified manually rather than accepted
from generated output.

## FE-09 testing pass

Run `npm test` for the six typed tool-contract tests and `npm run test:e2e`
against a running local app. GitHub Actions runs both the unit suite and the
Playwright smoke flow on pushes to `master` and pull requests.

## First assignment

The Frontend AI Engineering starter includes a semantic HTML page, accessible interaction, and track-local conventions for iterative work.
