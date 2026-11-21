"use client";

import { useEffect, useRef, useState } from "react";

export function AccessibleComponents() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dialogOpen) {
      triggerRef.current?.focus();
      return;
    }
    dialogRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDialogOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dialogOpen]);

  function onTabKey(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    setTab((current) => event.key === "ArrowRight" ? (current + 1) % 3 : (current + 2) % 3);
  }

  return (
    <div className="card playground-card">
      <p className="eyebrow">ARIA practice playground</p>
      <h1>Accessible primitives, built by hand.</h1>
      <p className="muted">Keyboard-test each interaction: Tab, Escape, and arrow keys all have intentional behavior.</p>
      <div className="playground-grid">
        <section>
          <h2>Modal dialog</h2>
          <button ref={triggerRef} className="button primary" onClick={() => setDialogOpen(true)}>Open dialog</button>
          {dialogOpen && <div className="dialog-backdrop" role="presentation">
            <div className="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1} ref={dialogRef}>
              <h3 id="dialog-title">Workspace confirmation</h3>
              <p>Escape closes this dialog and returns focus to the trigger.</p>
              <button className="button primary" onClick={() => setDialogOpen(false)}>Continue</button>
            </div>
          </div>}
        </section>
        <section>
          <h2>Tabs</h2>
          <div className="tabs" role="tablist" aria-label="Workspace details" onKeyDown={onTabKey}>
            {["Overview", "Keyboard", "Notes"].map((label, index) => <button key={label} role="tab" aria-selected={tab === index} tabIndex={tab === index ? 0 : -1} onClick={() => setTab(index)}>{label}</button>)}
          </div>
          <p role="tabpanel">{["A compact workspace overview.", "Arrow keys move between tabs.", "No library is required for these primitives."][tab]}</p>
        </section>
        <section>
          <h2>Disclosure</h2>
          <button className="disclosure-trigger" aria-expanded={expanded} aria-controls="disclosure-panel" onClick={() => setExpanded(!expanded)}>How focus works <span>{expanded ? "−" : "+"}</span></button>
          {expanded && <p id="disclosure-panel">The disclosure exposes its state through aria-expanded and keeps the content in the accessibility tree only when open.</p>}
        </section>
      </div>
    </div>
  );
}
