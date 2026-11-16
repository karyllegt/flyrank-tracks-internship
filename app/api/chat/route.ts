import { NextRequest } from "next/server";
import { workspaceAuditTool } from "./tools";

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
  const latestMessage = messages[messages.length - 1]?.content || "";
  const shouldRunTool = /\b(audit|score|check|review)\b/i.test(latestMessage);
  const shouldSimulateFailure = /\b(fail|sabotage|429|rate limit)\b/i.test(latestMessage);

  if (shouldRunTool || shouldSimulateFailure) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: string, data: unknown) => {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        };

        try {
          if (shouldSimulateFailure) {
            send("message", { content: "The response started, but the upstream service stopped." });
            await new Promise((resolve) => setTimeout(resolve, 220));
            send("error", {
              code: "UPSTREAM_INTERRUPTED",
              message: "The model stream was interrupted. Retry this message to continue."
            });
            controller.close();
            return;
          }

          send("tool", {
            state: "input-streaming",
            tool: workspaceAuditTool.name,
            message: "Preparing an audit for your workspace."
          });
          await new Promise((resolve) => setTimeout(resolve, 220));

          const parsed = workspaceAuditTool.schema.safeParse({
            focus: latestMessage.replace(/\b(audit|score|check|review)\b/gi, "").trim() ||
              "frontend quality",
            includeRecommendations: true
          });

          if (!parsed.success) {
            send("tool", {
              state: "output-error",
              tool: workspaceAuditTool.name,
              message: "The audit focus must be at least three characters."
            });
            controller.close();
            return;
          }

          send("tool", {
            state: "input-available",
            tool: workspaceAuditTool.name,
            input: parsed.data
          });
          await new Promise((resolve) => setTimeout(resolve, 220));

          const result = await workspaceAuditTool.execute(parsed.data);
          send("tool", {
            state: "output-available",
            tool: workspaceAuditTool.name,
            result
          });
          send("message", {
            content: `I ran the ${result.focus} audit. The workspace scored ${result.score}/100 with ${result.findings.length} typed findings.`
          });
        } catch {
          send("tool", {
            state: "output-error",
            tool: workspaceAuditTool.name,
            message: "The audit could not finish. Try the tool again."
          });
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/event-stream",
        Connection: "keep-alive"
      }
    });
  }

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://flyrank-tracks-internship.vercel.app",
      "X-Title": "FlyRank Workspace"
    },
    body: JSON.stringify({
      model: "openrouter/free",
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
