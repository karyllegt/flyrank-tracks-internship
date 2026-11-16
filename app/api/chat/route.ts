import { NextRequest } from "next/server";

const systemPrompt =
  "You are the FlyRank Workspace assistant. Give concise, practical answers about frontend project work.";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "OPENROUTER_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const body = (await request.json()) as {
    messages?: Array<{ role: "user" | "assistant"; content: string }>;
  };

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://flyrank-tracks-internship.vercel.app",
      "X-Title": "FlyRank Workspace"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      stream: true,
      messages: [{ role: "system", content: systemPrompt }, ...messages]
    }),
    signal: request.signal
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text();
    return Response.json(
      { error: `Model request failed: ${detail || upstream.statusText}` },
      { status: 502 }
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream",
      Connection: "keep-alive"
    }
  });
}
