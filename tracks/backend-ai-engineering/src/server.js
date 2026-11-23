import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { assess } from './risk.js';

const jobs = new Map();
const json = (res, status, body) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };
const readBody = req => new Promise((resolve, reject) => { let data = ''; req.on('data', chunk => { data += chunk; if (data.length > 10000) reject(new Error('payload too large')); }); req.on('end', () => resolve(data)); req.on('error', reject); });

export const server = createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/health') return json(res, 200, { status: 'ok', service: 'ruleguard-ai' });
    if (req.method === 'POST' && req.url === '/v1/assessments') {
      const body = JSON.parse(await readBody(req));
      const result = assess(body.request);
      return json(res, 200, { id: randomUUID(), result });
    }
    if (req.method === 'POST' && req.url === '/v1/jobs') {
      const body = JSON.parse(await readBody(req));
      assess(body.request);
      const id = randomUUID();
      jobs.set(id, { id, status: 'queued', created_at: new Date().toISOString() });
      setImmediate(() => { const job = jobs.get(id); try { job.status = 'completed'; job.result = assess(body.request); } catch (error) { job.status = 'failed'; job.error = error.message; } });
      return json(res, 202, jobs.get(id));
    }
    if (req.method === 'GET' && req.url.startsWith('/v1/jobs/')) return json(res, 200, jobs.get(req.url.split('/').pop()) ?? { error: 'not_found' });
    return json(res, 404, { error: 'not_found' });
  } catch (error) {
    const status = error.code === 'VALIDATION_ERROR' ? 400 : error instanceof SyntaxError ? 400 : 500;
    return json(res, status, { error: status === 400 ? 'validation_error' : 'internal_error', message: error.message });
  }
});

if (process.argv[1]?.endsWith('server.js')) server.listen(process.env.PORT ?? 8000);
