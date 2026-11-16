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
    <section className="card health-card">
      <div className="page-title"><div><p className="eyebrow">Live verification</p><h1>System pulse.</h1><p>A quick read on the workspace and its public deployment.</p></div><span className="icon-badge green">⌁</span></div>
      {health ? (
        <div className="health-grid"><div><span>Status</span><strong className="online"><i />{health.status}</strong></div><div><span>Repository</span><strong>{health.repository}</strong></div><div><span>Stars</span><strong>{health.stars}</strong></div></div>
      ) : (
        <p aria-live="polite">{error || "Fetching repository health..."}</p>
      )}
    </section>
  );
}
