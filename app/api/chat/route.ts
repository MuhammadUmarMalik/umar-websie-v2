import { type NextRequest } from "next/server";
import { getLLMConfig, CHAT_CONFIG } from "@/lib/chat/config";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import { checkRateLimit } from "@/lib/chat/rate-limit";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function sanitizeInput(text: string): string {
  return text
    .replace(/\b(ignore|disregard|forget)\b.*\b(instructions?|prompt|rules?|system)\b/gi, "[filtered]")
    .slice(0, CHAT_CONFIG.maxInputLength);
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 },
      );
    }

    const { messages } = (await req.json()) as { messages: ChatMessage[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    const trimmed = messages.slice(-CHAT_CONFIG.maxHistoryMessages).map((m) => ({
      role: m.role,
      content: m.role === "user" ? sanitizeInput(m.content) : m.content,
    }));

    const { apiKey, baseUrl, model } = getLLMConfig();
    if (!apiKey) {
      return Response.json(
        { error: "Chat is temporarily unavailable. Please contact me directly." },
        { status: 503 },
      );
    }

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        max_completion_tokens: CHAT_CONFIG.maxOutputTokens,
        temperature: 1,
        top_p: 1,
        reasoning_effort: "low",
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...trimmed,
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("LLM error:", res.status, text);
      return Response.json(
        { error: "Chat is temporarily unavailable. Please try again shortly." },
        { status: 502 },
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine.startsWith("data: ")) continue;
              const data = trimmedLine.slice(6);
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const json = JSON.parse(data);
                const token = json.choices?.[0]?.delta?.content;
                if (token) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ token })}\n\n`),
                  );
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
