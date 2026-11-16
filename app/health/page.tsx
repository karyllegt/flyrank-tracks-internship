"use client";

import { useEffect, useState } from "react";

type Health = { status: string; repository: string; stars: number };

export default function HealthPage() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/repos/karyllegt/flyrank-tracks-internship")
      .then((response) => {
        if (!response.ok) throw new Error("Health data request failed.");
        return response.json();
      })
      .then((data) =>
        setHealth({
          status: "ok",
          repository: data.full_name,
          stars: data.stargazers_count
        })
      )
      .catch(() => setError("Health data is temporarily unavailable."));
  }, []);

  return (
    <section className="card">
      <p className="eyebrow">Live verification</p>
      <h1>Health check</h1>
      {health ? (
        <dl>
          <dt>Status</dt>
          <dd>{health.status}</dd>
          <dt>Repository</dt>
          <dd>{health.repository}</dd>
          <dt>Stars</dt>
          <dd>{health.stars}</dd>
        </dl>
      ) : (
        <p aria-live="polite">{error || "Fetching repository health..."}</p>
      )}
    </section>
  );
}
