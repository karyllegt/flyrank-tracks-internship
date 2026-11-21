export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Frontend AI Engineering <span>•</span> 2026</p>
          <h1>Build boldly.<br /><em>Ship clearly.</em></h1>
          <p className="hero-lede">A focused command center for turning ambitious ideas into polished, verifiable work.</p>
          <div className="hero-actions">
            <a className="button primary" href="/dashboard/">Open dashboard <span>↗</span></a>
            <a className="button ghost" href="/chat/">Talk to the assistant</a>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-core"><span>✦</span></div>
          <div className="float-card float-top"><span className="mini-icon purple">✦</span><div><b>AI assisted</b><small>Workflow active</small></div></div>
          <div className="float-card float-bottom"><span className="mini-icon green">✓</span><div><b>Health check</b><small>All systems nominal</small></div></div>
        </div>
      </section>
      <section className="stats-grid">
        <div className="stat-card"><span className="stat-label">Current focus</span><strong>Frontend AI</strong><small>Engineering track</small></div>
        <div className="stat-card"><span className="stat-label">Progress</span><strong>4 <small>/ 14</small></strong><div className="progress"><span style={{ width: "29%" }} /></div><small>Assignments completed</small></div>
        <div className="stat-card"><span className="stat-label">Next milestone</span><strong>Streaming UI</strong><small>FE-06 · Build phase</small></div>
      </section>
      <section className="section-heading"><div><p className="eyebrow">Your workspace</p><h2>Everything in one clear view.</h2></div><a href="/dashboard/" className="text-link">View dashboard →</a></section>
      <section className="feature-grid">
        <a className="feature-card feature-purple" href="/chat/"><span className="feature-icon">✦</span><h3>AI workspace assistant</h3><p>Think through ideas, debug flows, and keep momentum with a streaming assistant.</p><span className="feature-arrow">↗</span></a>
        <a className="feature-card feature-blue" href="/health/"><span className="feature-icon">⌁</span><h3>Live project health</h3><p>Check your deployed workspace and keep every important signal visible.</p><span className="feature-arrow">↗</span></a>
        <a className="feature-card feature-green" href="/settings/"><span className="feature-icon">◎</span><h3>Personalize your flow</h3><p>Keep your profile and working preferences ready for the next sprint.</p><span className="feature-arrow">↗</span></a>
      </section>
    </div>
  );
}
