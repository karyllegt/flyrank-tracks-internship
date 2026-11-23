export const rules = [
  { id: 'AUTH-001', topic: 'authentication', text: 'Password reset must verify ownership with a one-time, expiring token; never trust an email address alone.' },
  { id: 'AUTHZ-001', topic: 'authorization', text: 'A user may read or change only resources they own, unless an explicit role grants access.' },
  { id: 'INPUT-001', topic: 'input validation', text: 'Validate input at the API boundary, reject unknown fields, and constrain lengths and formats.' },
  { id: 'RATE-001', topic: 'rate limiting', text: 'Authentication and password-reset endpoints require per-user and per-IP rate limits.' },
  { id: 'DATA-001', topic: 'sensitive data', text: 'Do not return passwords, access tokens, secrets, or full payment data in API responses or logs.' },
  { id: 'API-001', topic: 'api design', text: 'Destructive operations require explicit authorization, audit events, and an idempotency strategy.' }
];

const terms = text => new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? []);

export function retrieve(query, topK = 3) {
  const q = terms(query);
  return rules.map(rule => {
    const overlap = [...terms(`${rule.topic} ${rule.text}`)].filter(term => q.has(term)).length;
    return { ...rule, score: overlap };
  }).filter(rule => rule.score > 0).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, topK);
}
