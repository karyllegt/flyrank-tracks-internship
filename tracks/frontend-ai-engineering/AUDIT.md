# FE-10 accessibility and performance audit

## Scope

Audited the deployed homepage and chat entry point at
`https://flyrank-tracks-internship.vercel.app/` using Lighthouse's mobile
preset, plus a keyboard and responsive pass through the primary chat flow.

## Lighthouse measurements

| Run | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Baseline | 67 | 100 | 96 | 100 |
| After removing the render-blocking Google Fonts import | 64 | 100 | 96 | 100 |

The performance score varied between runs because the public Vercel preview
includes cold-start and network timing. Accessibility remained at 100 in both
runs; the current performance result is below the track's 80-point minimum and
is therefore recorded as an open optimization item rather than claimed as a
pass.

## Changes verified

- Removed the render-blocking external font import from `app/globals.css`.
- Kept a polite `aria-live` region around streamed chat messages.
- Kept the stop and retry controls keyboard reachable with visible focus styles.
- Preserved the actionable first-run empty state and designed interrupted-stream
  recovery state.
- Added mobile screenshots for the deployed homepage and chat entry point:
  - [Home after audit](./docs/audit/home-after.png)
  - [Chat empty state](./docs/audit/chat-empty.png)

## Remaining optimization

The next performance pass should profile the public deployment's main-thread
work and Vercel cold-start timing before changing the visual design further.
