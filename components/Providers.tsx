"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

// NOTE: PostHog was removed from this client bundle. `posthog-js` is ~90KB
// gzipped and lived in the critical-path JS even though `NEXT_PUBLIC_POSTHOG_KEY`
// is unset, so it never instrumented anything — pure dead weight on mobile.
// If PostHog is ever enabled, re-add it as a lazily loaded module (dynamic
// import inside the `if (key)` guard) rather than a static import so the main
// bundle stays lean.

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
