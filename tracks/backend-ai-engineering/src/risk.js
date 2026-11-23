import { retrieve } from './knowledge.js';

export const categories = ['authentication', 'authorization', 'input_validation', 'rate_limiting', 'sensitive_data', 'api_design', 'other'];
export const levels = ['low', 'medium', 'high', 'critical'];

function classify(request) {
  const text = request.toLowerCase();
  if (/secret|payment|pii|token.*return|log.*credential|access tokens?/.test(text)) return 'sensitive_data';
  if (/rate|throttle|brute/.test(text)) return 'rate_limiting';
  if (/password|reset|login|token|credential/.test(text)) return 'authentication';
  if (/another user|admin|role|permission|access|delete.*account/.test(text)) return 'authorization';
  if (/validate|unknown field|schema|payload|input/.test(text)) return 'input_validation';
  if (/delete|destructive|endpoint|api|idempot/.test(text)) return 'api_design';
  return 'other';
}

export function assess(request, { promptVersion = 'risk-v1', topK = 3 } = {}) {
  if (typeof request !== 'string' || request.trim().length < 1 || request.length > 2000) {
    const error = new Error('request must be between 1 and 2000 characters');
    error.code = 'VALIDATION_ERROR';
    throw error;
  }
  const category = classify(request);
  const sources = retrieve(request, topK);
  const unsafe = /ignore (all|the)|bypass|without (auth|permission)|return.*secret/i.test(request);
  const highRisk = unsafe || category === 'authorization' || category === 'sensitive_data';
  const level = unsafe ? 'critical' : highRisk ? 'high' : category === 'other' ? 'medium' : 'low';
  const confidence = sources.length ? Math.min(0.98, 0.62 + sources[0].score * 0.08) : 0.45;
  return {
    category, risk_level: level, confidence: Number(confidence.toFixed(2)),
    requires_review: confidence < 0.75 || category === 'other' || highRisk,
    rationale: highRisk ? 'The request conflicts with a backend safety rule and needs explicit review before implementation.' : 'The request is bounded by the retrieved backend rules and can proceed with validation and monitoring.',
    recommended_controls: highRisk ? ['enforce authorization at the boundary', 'add an audit event', 'cover the failure case with an evaluation'] : ['validate the request schema', 'add a focused regression test'],
    sources: sources.map(({ id, topic, text: ruleText, score }) => ({ id, topic, text: ruleText, score })),
    prompt_version: promptVersion
  };
}
