"use client";

import { FormEvent, useState } from "react";

export default function SettingsPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Settings saved locally for this prototype.");
  }

  return (
    <section className="card">
      <p className="eyebrow">Placeholder route</p>
      <h1>Settings</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Display name
          <input required name="displayName" autoComplete="name" />
        </label>
        <label>
          Email
          <input required type="email" name="email" autoComplete="email" />
        </label>
        <button type="submit">Save settings</button>
        <p aria-live="polite">{message}</p>
      </form>
    </section>
  );
}
