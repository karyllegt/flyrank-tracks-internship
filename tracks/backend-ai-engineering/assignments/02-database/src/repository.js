export const migration = `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL, completed BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP); CREATE INDEX IF NOT EXISTS tasks_created_at_idx ON tasks(created_at);`;
export class TaskRepository {
  constructor() { this.rows = new Map(); this.nextId = 1; }
  list() { return [...this.rows.values()]; }
  find(id) { return this.rows.get(Number(id)) ?? null; }
  insert(title) { const row = { id: this.nextId++, title, completed: false, created_at: new Date().toISOString() }; this.rows.set(row.id, row); return row; }
  update(id, patch) { const row = this.find(id); if (!row) return null; Object.assign(row, patch); return row; }
  delete(id) { return this.rows.delete(Number(id)); }
}
