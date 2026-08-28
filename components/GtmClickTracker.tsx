"use client";

import { useEffect } from "react";
import { trackCalendlyClick } from "@/lib/gtm";

/**
 * Delegated click tracking for Calendly links.
 *
 * Calendly CTAs live in eight places, several of which are server components
 * (app/contact/page.tsx, app/pricing/page.tsx). Rather than converting those
 * to client components just to attach an onClick, a single document-level
 * listener catches every `<a href="...calendly.com...">` on the page —
 * including any added later.
 *
 * Registered in the capture phase so it still fires if an intermediate
 * handler calls stopPropagation().
 */
export function GtmClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href*="calendly.com"]');
      if (!link) return;

      trackCalendlyClick({
        link_url: link.href,
        link_text: link.textContent?.trim().slice(0, 100) || "",
        page_path: window.location.pathname,
      });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
