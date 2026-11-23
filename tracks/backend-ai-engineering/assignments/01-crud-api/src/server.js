import { createServer } from 'node:http';
let nextId = 1;
const tasks = [];
const send = (res, status, body) => { res.writeHead(status, { 'content-type': 'application/json' }); if (status !== 204) res.end(JSON.stringify(body)); else res.end(); };
const body = req => new Promise((resolve, reject) => { let raw = ''; req.on('data', c => raw += c); req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(Object.assign(new Error('invalid JSON'), { status: 400 })); } }); });
export const server = createServer(async (req, res) => {
  try {
    const [path, id] = req.url.split('/').filter(Boolean);
    if (path !== 'tasks') return send(res, 404, { error: 'not_found' });
    if (req.method === 'GET' && !id) return send(res, 200, tasks);
    if (req.method === 'GET' && id) { const item = tasks.find(t => t.id === Number(id)); return item ? send(res, 200, item) : send(res, 404, { error: 'task_not_found' }); }
    if (req.method === 'POST' || req.method === 'PUT') { const input = await body(req); if (typeof input.title !== 'string' || !input.title.trim()) return send(res, 400, { error: 'title_required' }); if (req.method === 'POST') { const item = { id: nextId++, title: input.title.trim(), completed: Boolean(input.completed) }; tasks.push(item); return send(res, 201, item); } const item = tasks.find(t => t.id === Number(id)); if (!item) return send(res, 404, { error: 'task_not_found' }); Object.assign(item, { title: input.title.trim(), completed: Boolean(input.completed) }); return send(res, 200, item); }
    if (req.method === 'DELETE' && id) { const index = tasks.findIndex(t => t.id === Number(id)); if (index < 0) return send(res, 404, { error: 'task_not_found' }); tasks.splice(index, 1); return send(res, 204); }
    return send(res, 404, { error: 'not_found' });
  } catch (error) { return send(res, error.status ?? 500, { error: error.message }); }
});
if (process.argv[1]?.endsWith('server.js')) server.listen(8010);
