# FlyRank Workspace capstone

## Project brief

FlyRank Workspace is a focused command center for frontend learners who need
to turn AI-assisted ideas into verifiable shipped work. It combines progress
tracking, deployment health, a streaming workspace assistant, and a structured
audit tool so a developer can ask for guidance and receive useful UI rather
than an unstructured text dump.

## Live product

- Production: https://flyrank-tracks-internship.vercel.app/
- Repository: https://github.com/karyllegt/flyrank-tracks-internship
- Chat/tool demo: https://flyrank-tracks-internship.vercel.app/chat/

## Architecture and AI integration

Next.js App Router provides the pages and server route. The chat client owns
conversation state and consumes SSE. `app/api/chat/route.ts` keeps the
OpenRouter key server-side, applies input/rate limits, and streams either
model tokens or typed tool events. `app/api/chat/tools.ts` defines the
Zod-validated `audit_workspace` tool and its typed result. The UI renders tool
input, output, error, and audit findings as distinct components.

The model is used for open-ended frontend guidance. The audit tool is
deliberately deterministic: it gives the reviewer a reliable structured
workflow without requiring paid model credits. Enter `audit accessibility` to
see the tool result; enter `fail` to see the interrupted-stream recovery path.

## Evidence

- Six Vitest unit tests pass for schema validation and tool results.
- Playwright verifies the actionable first-run chat state.
- GitHub Actions runs tests and the production build on every push.
- FE-10 audit: accessibility 100, best practices 96, SEO 100. Performance
  varied from 64–67 on the public mobile Lighthouse run because of Vercel
  cold-start/network timing; this is documented as an open optimization.
- Error recovery preserves partial output and offers a retry action.

## Deployment checklist

- [x] Production URL deployed and reachable
- [x] Server secret read only from environment variables
- [x] Input history and message length capped
- [x] Per-forwarded-IP request window and 429 response
- [x] Streaming route duration limit
- [x] Unit and browser tests pass
- [x] GitHub Actions test/build workflow green
- [x] README includes setup, architecture, environment variables, and AI usage
- [x] Rollback plan: redeploy a known-good commit from `master`

## Reflection

The hardest part was keeping the streaming experience useful when the model
or network fails. The important design decision was to treat interruption as a
state transition: partial text remains visible, the user sees what failed,
and retry targets the last message instead of resetting the whole conversation.

Next time I would move rate-limit state to shared storage before scaling beyond
a single preview instance. I would also profile the Vercel cold-start path
earlier; the accessibility work reached a strong result quickly, while
performance still needs a deeper production trace.

The most surprising lesson was that a small typed tool result makes an AI
interface feel like a product. A score card and findings list communicate
more clearly than a polished paragraph containing the same facts.
