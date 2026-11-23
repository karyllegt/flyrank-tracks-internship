# Image Relevance & Auto-Tagging

Architecture: upload metadata validation → content hash deduplication → bounded image-analysis provider call → closed tag taxonomy → confidence threshold → human review queue. Outputs include tags, confidence, model version, and a provenance record; low-confidence predictions are never silently published.
