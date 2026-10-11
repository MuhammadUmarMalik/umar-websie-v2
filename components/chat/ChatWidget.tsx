"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface LeadForm {
  name: string;
  email: string;
  details: string;
}

const QUICK_REPLIES = [
  "What services do you offer?",
  "Get a quote",
  "See your projects",
  "How does your process work?",
];

const LEAD_TRIGGERS =
  /\b(name|email|project\s*details?|get\s*in\s*touch|reach\s*out|connect\s*you|send.*proposal|book.*call|share.*details|contact\s*info|follow\s*up)\b/i;

function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

const STORAGE_KEY = "nlcb-history";
const LEAD_SENT_KEY = "nlcb-lead-sent";
const WELCOME_MSG: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! 👋 I'm Umar's AI assistant. Ask me about his services, projects, or process. Tap a suggestion below to get started.",
};

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [WELCOME_MSG];
  } catch {
    return [WELCOME_MSG];
  }
}

function saveHistory(msgs: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-20)));
  } catch {}
}

function LeadCaptureForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (data: LeadForm) => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState<LeadForm>({ name: "", email: "", details: "" });
  const valid = form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.details.trim();

  return (
    <div className="mx-4 mb-2 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-subtle)] p-3 space-y-2">
      <p className="text-xs font-semibold text-[var(--text-primary)]">
        📋 Share your details so Umar can follow up:
      </p>
      <input
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)]"
      />
      <input
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)]"
      />
      <textarea
        placeholder="Brief project description"
        value={form.details}
        onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
        rows={2}
        className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)]"
      />
      <button
        onClick={() => valid && onSubmit(form)}
        disabled={!valid || submitting}
        className="w-full rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send to Umar"}
      </button>
    </div>
  );
}

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMounted(true);
    setMessages(loadHistory());
    try { setLeadSent(localStorage.getItem(LEAD_SENT_KEY) === "1"); } catch {}
  }, []);

  useEffect(() => {
    if (messages.length > 1) saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming, showLeadForm]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const submitLead = async (data: LeadForm) => {
    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setShowLeadForm(false);
      setLeadSent(true);
      try { localStorage.setItem(LEAD_SENT_KEY, "1"); } catch {}
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Thanks, ${data.name}! 🎉 I've sent your details to Umar. He'll get back to you at ${data.email} within 24 to 48 hours.`,
        },
      ]);
    } catch {
      setError("Failed to send your details. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setError(null);
      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
      const assistantMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "" };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setStreaming(true);

      const history = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        abortRef.current = new AbortController();
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Something went wrong.");
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data: ")) continue;
            const data = t.slice(6);
            if (data === "[DONE]") continue;
            try {
              const { token } = JSON.parse(data);
              if (token) {
                fullContent += token;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id ? { ...m, content: fullContent } : m,
                  ),
                );
              }
            } catch {}
          }
        }

        if (!fullContent) {
          throw new Error("No response received.");
        }

        // Show lead form if LLM response has lead-capture intent and form not already sent
        if (!leadSent && LEAD_TRIGGERS.test(fullContent)) {
          setShowLeadForm(true);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const msg = (err as Error).message || "Something went wrong.";
        setError(msg);
        setMessages((prev) => prev.filter((m) => m.id !== assistantMsg.id));
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming, leadSent],
  );

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([WELCOME_MSG]);
    setStreaming(false);
    setError(null);
    setShowLeadForm(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-20 right-4 z-[80] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:bottom-[5.5rem] sm:right-5 sm:h-[52px] sm:w-[52px] md:bottom-24 md:right-6 md:h-14 md:w-14"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-36 right-4 z-[80] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-xl transition-all duration-300 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        style={{ height: "min(520px, calc(100dvh - 11rem))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
              U
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">UmarGPT</p>
              <p className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_theme(colors.emerald.400)]" />
                Online
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            title="Clear chat"
          >
            Clear
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[var(--accent)] text-white rounded-br-md"
                    : "bg-[var(--surface-secondary)] text-[var(--text-primary)] rounded-bl-md"
                }`}
              >
                {m.content ? renderContent(m.content) : (
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Lead capture form — shown when LLM asks for contact details */}
        {showLeadForm && !leadSent && (
          <LeadCaptureForm onSubmit={submitLead} submitting={leadSubmitting} />
        )}

        {/* Quick replies */}
        {!streaming && messages[messages.length - 1]?.role === "assistant" && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mx-4 mb-2 flex items-center justify-between rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950 dark:text-red-400">
            <span>{error}</span>
            <button
              onClick={() => {
                setError(null);
                const lastUser = [...messages].reverse().find((m) => m.role === "user");
                if (lastUser) sendMessage(lastUser.content);
              }}
              className="ml-2 font-medium underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-[var(--border)] px-3 py-2">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors"
              disabled={streaming}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || streaming}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white transition-opacity disabled:opacity-40"
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4z" /><path d="m22 2-11 11" /></svg>
            </button>
          </div>
          <p className="mt-1 text-center text-[10px] text-[var(--text-muted)]">
            AI assistant · May not always be accurate
          </p>
        </div>
      </div>
    </>,
    document.body,
  );
}
