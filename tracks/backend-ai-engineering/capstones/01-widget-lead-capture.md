# Embeddable Widget & Lead-Capture Platform

Architecture: signed tenant-scoped widget token → rate-limited form endpoint → Zod-equivalent boundary validation → duplicate detection → append-only audit event → webhook queue with retry/backoff. The contract accepts name, email, consent, source, and optional message; it rejects unknown or oversized fields and never logs the email body.
