# BE-01 — Build your first CRUD API

Implemented contract: `GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, and `DELETE /tasks/:id`. The reference implementation is the HTTP server in `src/server.js`; it uses an in-memory collection, validates non-empty titles, returns JSON errors, and documents the endpoint contract below.

Run from the track root with `node assignments/01-crud-api/src/server.js`. The API listens on port 8010. This is intentionally separate from the capstone service so the no-database requirement remains testable.

Expected statuses: 200 reads, 201 create, 204 delete, 400 invalid body, 404 unknown ID.
