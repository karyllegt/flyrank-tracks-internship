"use client";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-shell">
      <section className="card empty-state">
        <p className="eyebrow">Workspace interruption</p>
        <h1>That view needs a fresh start.</h1>
        <p>Something went wrong while loading this route. Your workspace data is still safe.</p>
        <button type="button" onClick={reset}>Try again</button>
      </section>
    </main>
  );
}
