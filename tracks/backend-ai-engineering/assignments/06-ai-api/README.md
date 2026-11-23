# Connect to an AI API

`src/classifier.js` is a provider-neutral structured-output seam. It validates the incoming support message, classifies it into a closed enum, and returns a schema-stable object. The deterministic fallback is used for CI; a real provider can implement `provider.complete()` without changing the HTTP contract.
