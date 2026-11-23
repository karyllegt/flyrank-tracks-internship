# Your first background job

`src/job-queue.js` implements the required `202 Accepted` pattern: submit returns an ID immediately, status is polled separately, work is idempotent by key, and failures become a controlled terminal state. A Redis/BullMQ or Inngest adapter can replace the in-memory queue.
