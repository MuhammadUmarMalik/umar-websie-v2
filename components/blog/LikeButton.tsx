"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    function fetchLikes() {
      fetch(`/api/posts/${slug}/like`)
        .then((r) => r.json())
        .then((d) => {
          setCount(d.count);
          setLiked(d.liked);
        })
        .catch(() => {});
    }

    fetchLikes();
    const interval = setInterval(fetchLikes, 5000);
    return () => clearInterval(interval);
  }, [slug]);

  function toggle() {
    startTransition(async () => {
      const prev = liked;
      setLiked(!prev);
      setCount((c) => c + (prev ? -1 : 1));

      try {
        const res = await fetch(`/api/posts/${slug}/like`, { method: "POST" });
        const data = await res.json();
        setCount(data.count);
        setLiked(data.liked);
      } catch {
        setLiked(prev);
        setCount((c) => c + (prev ? 1 : -1));
      }
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        liked
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-border bg-bg-card text-text-secondary hover:border-accent/30 hover:text-accent",
      )}
    >
      <Heart
        className={cn("size-4 transition-transform", liked && "scale-110 fill-current")}
      />
      {count > 0 && <span>{count}</span>}
    </button>
  );
}
