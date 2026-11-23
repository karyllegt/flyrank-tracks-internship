# FlyRank Backend AI Engineering Track

This implementation is a local, dependency-light capstone called **RuleGuard AI**. It turns one backend change request into a validated risk assessment using a small retrieval-backed ruleset. The design follows the official track outcomes: explicit API contracts, bounded task behavior, grounding, structured output, evaluation evidence, failure handling, and an operational background-job path.

## Implemented requirements

| Track requirement | Evidence |
| --- | --- |
| API contract | `POST /v1/assessments`, `POST /v1/jobs`, `GET /v1/jobs/:id`, `GET /health` |
| Retrieval and grounding | `src/knowledge.js` returns scored rules and source IDs |
| Structured output | `src/risk.js` emits fixed categories, levels, confidence, controls, and sources |
| Failure handling | boundary validation, JSON error contract, bounded payload size, job failure state |
| Evaluation | 8 labeled cases in `evals/cases.json`, runnable with `npm run eval` |
| Tests | input validation, grounding, risk classification, and prompt-injection regression tests |
| Capstone artifact | a usable RAG-style backend service with an asynchronous job endpoint and audit-friendly result shape |

## Run

```text
npm test
npm run eval
npm start
```

The service uses Node's standard library so the tests run without network access or API keys. The retrieval and assessment seams are deliberately isolated so a hosted model, vector database, auth middleware, and persistent queue can be added without changing the public contract.

## Known limitations

The current capstone uses deterministic lexical retrieval and a rule-based judge. It does not claim model quality, production authentication, distributed durability, or a deployed URL. Those are the next production-hardening steps; the evaluation harness is included so a model-backed implementation can be compared against this baseline rather than accepted on demo behavior alone.
