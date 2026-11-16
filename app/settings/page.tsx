"use client";

import { FormEvent, useState } from "react";
import { MotionButton } from "../components/motion-button";

export default function SettingsPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Settings saved locally for this prototype.");
  }

  return (
    <section className="card settings-card">
      <div className="page-title"><div><p className="eyebrow">Workspace preferences</p><h1>Make it yours.</h1><p>Keep your working identity close to the work.</p></div><span className="icon-badge purple">◎</span></div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Display name
          <input required name="displayName" autoComplete="name" />
        </label>
        <label>
          Email
          <input required type="email" name="email" autoComplete="email" />
        </label>
        <button className="button primary" type="submit">Save preferences <span>→</span></button>
        <p className="success-message" aria-live="polite">{message}</p>
      </form>
      <div className="motion-card">
        <p className="eyebrow">Motion system</p>
        <h2>Buttons that explain themselves.</h2>
        <p>Preview the send-button state language used across the workspace.</p>
        <MotionButton />
      </div>
    </section>
  );
}
