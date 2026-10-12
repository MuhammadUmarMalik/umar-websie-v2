"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  name: string;
  body: string;
  parentId: string | null;
  createdAt: string;
  replies?: Comment[];
}

export function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  useEffect(() => {
    function fetchComments() {
      fetch(`/api/posts/${slug}/comments`)
        .then((r) => r.json())
        .then(setComments)
        .catch(() => {});
    }

    fetchComments();
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, [slug]);

  function onCommentAdded() {
    fetch(`/api/posts/${slug}/comments`)
      .then((r) => r.json())
      .then(setComments)
      .catch(() => {});
  }

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold">
        <MessageSquare className="size-6" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      <CommentForm slug={slug} onSuccess={onCommentAdded} />

      {comments.length > 0 && (
        <div className="mt-8 space-y-6">
          {comments.map((c) => (
            <div key={c.id}>
              <CommentCard comment={c} onReply={() => setReplyTo(c.id)} />
              {c.replies && c.replies.length > 0 && (
                <div className="ml-6 mt-3 space-y-3 border-l-2 border-border pl-4">
                  {c.replies.map((r) => (
                    <CommentCard key={r.id} comment={r} />
                  ))}
                </div>
              )}
              {replyTo === c.id && (
                <div className="ml-6 mt-3">
                  <CommentForm
                    slug={slug}
                    parentId={c.id}
                    onSuccess={() => {
                      setReplyTo(null);
                      onCommentAdded();
                    }}
                    onCancel={() => setReplyTo(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function CommentCard({
  comment,
  onReply,
}: {
  comment: Comment;
  onReply?: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-xs text-text-secondary">
        <span className="font-medium text-text-primary">{comment.name}</span>
        <span>&middot;</span>
        <time>{new Date(comment.createdAt).toLocaleDateString()}</time>
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{comment.body}</p>
      {onReply && (
        <button
          onClick={onReply}
          className="mt-2 text-xs font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Reply
        </button>
      )}
    </div>
  );
}

function CommentForm({
  slug,
  parentId,
  onSuccess,
  onCancel,
}: {
  slug: string;
  parentId?: string;
  onSuccess: () => void;
  onCancel?: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`/api/posts/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, body, parentId, honeypot: "" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to post comment");
      }

      const data = await res.json();
      setStatus("success");
      setName("");
      setEmail("");
      setBody("");

      if (data.status === "approved") {
        onSuccess();
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/5 p-4">
        <p className="text-sm text-success">
          Comment submitted! It will appear after moderation.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-accent hover:text-accent-hover"
        >
          Write another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <input name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          className={inputClass}
        />
        <input
          placeholder="Email (not shown) *"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={200}
          className={inputClass}
        />
      </div>
      <textarea
        placeholder={parentId ? "Write a reply..." : "Write a comment..."}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        maxLength={2000}
        rows={4}
        className={cn(inputClass, "resize-y")}
      />

      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-50"
        >
          {status === "loading" ? "Posting..." : parentId ? "Reply" : "Post Comment"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
