"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

interface ThemeToggleProps {
  ghost?: boolean;
}

const storageKey = "umar-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle({ ghost = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    const initialTheme: Theme = stored === "light" ? "light" : "dark";

    applyTheme(initialTheme);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      className={cn(
        "inline-grid size-10 place-items-center border transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4",
        ghost
          ? "border-white/25 bg-black/15 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/15 focus-visible:outline-white"
          : "border-border bg-surface text-text-primary hover:border-accent hover:text-accent focus-visible:outline-accent"
      )}
      onClick={() => {
        applyTheme(nextTheme);
        window.localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
      }}
    >
      <span className="sr-only">Toggle theme</span>
      {mounted ? (
        theme === "light" ? (
          <Moon className="size-4" aria-hidden />
        ) : (
          <Sun className="size-4" aria-hidden />
        )
      ) : (
        <span className="size-4" aria-hidden />
      )}
    </button>
  );
}
