"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
type ToolState = {
  state: "input-streaming" | "input-available" | "output-available" | "output-error";
  message?: string;
  input?: { focus: string; includeRecommendations: boolean };
  result?: {
    focus: string;
    score: number;
    findings: Array<{ label: string; detail: string; status: "pass" | "watch" }>;
    recommendations: string[];
  };
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const [toolState, setToolState] = useState<ToolState | null>(null);
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
    setToolState(null);
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
          const eventName =
            eventText.split("\n").find((line) => line.startsWith("event: "))?.slice(7) ||
            "message";
          const data = eventText
            .split("\n")
            .find((line) => line.startsWith("data: "))
            ?.slice(6);
          if (!data || data === "[DONE]") continue;
          const parsed = JSON.parse(data);
          if (eventName === "tool") {
            setToolState(parsed);
            continue;
          }
          const token = parsed.choices?.[0]?.delta?.content || parsed.content;
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
      <div className="page-title"><div><p className="eyebrow">AI interaction</p><h1>Think out loud.</h1><p>Ask a question, explore a direction, or pressure-test your next build.</p></div><span className="icon-badge purple">✦</span></div>
      <div className="messages" aria-live="polite">
        {messages.length === 0 && <div className="empty-chat"><span>✦</span><p>Ask about your frontend project.</p><small>The assistant will stream its response here.</small></div>}
        {messages.map((message, index) => (
          <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
            <strong>{message.role === "user" ? "You" : "Assistant"}</strong>
            <p>{message.content || (isStreaming ? "Thinking…" : "")}</p>
          </article>
        ))}
      </div>
      {toolState && (
        <section className={`tool-panel tool-${toolState.state}`} aria-live="polite">
          <div className="tool-panel-header">
            <div>
              <p className="eyebrow">Server tool · audit_workspace</p>
              <strong>
                {toolState.state === "input-streaming" && "Preparing tool input"}
                {toolState.state === "input-available" && "Tool input ready"}
                {toolState.state === "output-available" && "Audit result"}
                {toolState.state === "output-error" && "Tool error"}
              </strong>
            </div>
            <span className="tool-state">{toolState.state.replace("-", " ")}</span>
          </div>
          {toolState.message && <p>{toolState.message}</p>}
          {toolState.input && (
            <p className="tool-input">Focus: <strong>{toolState.input.focus}</strong></p>
          )}
          {toolState.result && (
            <div className="audit-result">
              <div className="audit-score"><strong>{toolState.result.score}</strong><span>/100</span></div>
              <div className="audit-findings">
                {toolState.result.findings.map((finding) => (
                  <div className="finding" key={finding.label}>
                    <span className={`finding-status ${finding.status}`}>{finding.status}</span>
                    <div><strong>{finding.label}</strong><p>{finding.detail}</p></div>
                  </div>
                ))}
              </div>
              <ul>{toolState.result.recommendations.map((recommendation) => <li key={recommendation}>{recommendation}</li>)}</ul>
            </div>
          )}
        </section>
      )}
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
