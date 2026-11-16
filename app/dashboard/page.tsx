export default function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="page-intro"><div><p className="eyebrow">Overview</p><h1>Your command center.</h1><p>Keep the important work visible, actionable, and moving forward.</p></div><span className="date-chip">● Week 04 · Build</span></section>
      <section className="dashboard-grid">
        <div className="panel progress-panel"><div className="panel-heading"><div><span className="panel-kicker">Track progress</span><h2>Frontend AI Engineering</h2></div><span className="icon-badge purple">✦</span></div><div className="big-progress"><strong>4</strong><span>/ 14<br /><small>assignments</small></span></div><div className="progress large"><span style={{ width: "29%" }} /></div><p className="muted">You are building a strong foundation. Keep the rhythm going.</p><a className="button primary small" href="/chat/">Continue building <span>→</span></a></div>
        <div className="panel next-panel"><span className="panel-kicker">Up next</span><h2>Streaming AI chat</h2><p>Build the central AI interaction for your capstone with a resilient streaming experience.</p><div className="task-meta"><span>FE-06</span><span>6 hour build</span></div><a className="text-link" href="/chat/">Open workspace →</a></div>
      </section>
      <section className="section-heading"><div><p className="eyebrow">Activity</p><h2>Recent momentum</h2></div><span className="muted">Updated just now</span></section>
      <section className="activity-list"><div><span className="activity-dot green" /><div><b>Health check verified</b><small>Deployment is responding normally</small></div><time>Now</time></div><div><span className="activity-dot purple" /><div><b>Streaming chat deployed</b><small>FE-06 is ready for review</small></div><time>Today</time></div><div><span className="activity-dot blue" /><div><b>Capstone skeleton shipped</b><small>Routes and design system are live</small></div><time>Yesterday</time></div></section>
    </div>
  );
}
