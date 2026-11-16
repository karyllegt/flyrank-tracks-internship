"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => controller.current?.abort();
  }, []);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const content = input.trim();
    if (!content || isStreaming) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setIsStreaming(true);
    controller.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.current.signal
      });

      if (!response.ok || !response.body) {
        const detail = await response.json().catch(() => null);
        throw new Error(detail?.error || "The assistant request failed.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const eventText of events) {
          const data = eventText
            .split("\n")
            .find((line) => line.startsWith("data: "))
            ?.slice(6);
          if (!data || data === "[DONE]") continue;
          const token = JSON.parse(data).choices?.[0]?.delta?.content;
          if (token) {
            setMessages((current) => {
              const updated = [...current];
              updated[updated.length - 1] = {
                role: "assistant",
                content: updated[updated.length - 1].content + token
              };
              return updated;
            });
          }
        }
      }
    } catch (caught) {
      if ((caught as Error).name !== "AbortError") {
        setError((caught as Error).message);
      }
    } finally {
      controller.current = null;
      setIsStreaming(false);
    }
  }

  return (
    <section className="card chat-card">
      <p className="eyebrow">AI interaction</p>
      <h1>Workspace assistant</h1>
      <div className="messages" aria-live="polite">
        {messages.length === 0 && <p className="muted">Ask about your frontend project.</p>}
        {messages.map((message, index) => (
          <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
            <strong>{message.role === "user" ? "You" : "Assistant"}</strong>
            <p>{message.content || (isStreaming ? "Thinking…" : "")}</p>
          </article>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <form className="chat-form" onSubmit={sendMessage}>
        <label className="sr-only" htmlFor="chat-input">Message</label>
        <input
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask a question"
          disabled={isStreaming}
        />
        {isStreaming ? (
          <button type="button" onClick={() => controller.current?.abort()}>
            Stop
          </button>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>
    </section>
  );
}
