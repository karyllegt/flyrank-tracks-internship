# Auth — Login & protect

`src/auth.js` provides password hashing with Node's scrypt, signed bearer tokens with HMAC-SHA256, constant-time signature comparison, and route authorization. Secrets are supplied through environment variables; no credentials are committed.
