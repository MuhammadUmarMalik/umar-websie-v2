"use client";

import { ArrowUp } from "lucide-react";

/**
 * The only interactive element in the footer. Kept as a tiny client island so
 * the rest of the footer (links, brand, socials) stays a Server Component and
 * ships zero JavaScript.
 */
export function ScrollToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="mono group inline-flex cursor-pointer items-center gap-1.5 text-xs uppercase text-text-secondary transition-colors duration-200 hover:text-accent"
      aria-label="Back to top"
    >
      <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      Top
    </button>
  );
}