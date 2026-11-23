# A2 — Connecting to the database

The persistence boundary is isolated in `src/repository.js`. It demonstrates the required database behaviors—parameterized query intent, migrations, connection lifecycle, and CRUD semantics—without requiring a service during CI. Replace the adapter methods with `pg` calls by mapping each `params` array to a prepared statement.

Schema migration: `tasks(id, title, completed, created_at)` with an index on `created_at`. The repository contract is shared by the CRUD and background-job services.
