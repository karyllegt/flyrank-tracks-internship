import { randomUUID } from 'node:crypto';
export class JobQueue {
  constructor(worker) { this.worker = worker; this.jobs = new Map(); this.keys = new Map(); }
  submit(payload, idempotencyKey = randomUUID()) { if (this.keys.has(idempotencyKey)) return this.jobs.get(this.keys.get(idempotencyKey)); const job = { id: randomUUID(), status: 'queued', progress: 0, created_at: new Date().toISOString() }; this.keys.set(idempotencyKey, job.id); this.jobs.set(job.id, job); setImmediate(async () => { try { job.status = 'running'; job.progress = 25; job.result = await this.worker(payload, value => job.progress = value); job.progress = 100; job.status = 'completed'; } catch (error) { job.status = 'failed'; job.error = error.message; } }); return job; }
  status(id) { return this.jobs.get(id) ?? null; }
}
