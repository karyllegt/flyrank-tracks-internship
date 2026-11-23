# LLM Usage Metering & Billing Service

Architecture: provider adapter emits usage events → idempotent usage ledger keyed by provider request ID → tenant quota check → daily aggregation → invoice preview. Token counts are taken from provider metadata, not guessed, and pricing is versioned by model and effective date.
