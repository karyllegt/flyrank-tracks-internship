"use client";

import { useState } from "react";

type ButtonState = "idle" | "loading" | "success" | "error";

export function MotionButton() {
  const [state, setState] = useState<ButtonState>("idle");

  function run(outcome: "success" | "error") {
    if (state === "loading") return;
    setState("loading");
    window.setTimeout(() => setState(outcome), 500);
    window.setTimeout(() => setState("idle"), 1_700);
  }

  const label = {
    idle: "Run workspace check",
    loading: "Checking…",
    success: "Check complete",
    error: "Check failed"
  }[state];

  return (
    <div className="motion-demo">
      <button
        className={`motion-button motion-${state}`}
        type="button"
        onClick={() => run("success")}
        aria-live="polite"
        disabled={state === "loading"}
      >
        <span className="motion-icon" aria-hidden="true">{state === "loading" ? "…" : state === "success" ? "✓" : state === "error" ? "!" : "✦"}</span>
        {label}
      </button>
      <div className="motion-triggers">
        <button type="button" onClick={() => run("success")}>Force success</button>
        <button type="button" onClick={() => run("error")}>Force error</button>
      </div>
      <small>Transitions use 200ms ease-out transforms and opacity; reduced-motion users retain the state feedback without movement.</small>
    </div>
  );
}
