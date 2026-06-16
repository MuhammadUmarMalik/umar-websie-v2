import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card": "var(--bg-card)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        border: "var(--border)",
        surface: "var(--surface)",
        ink: "var(--text-primary)",
        muted: "var(--text-secondary)",
        line: "var(--border)",
        night: "var(--bg-primary)",
        chalk: "var(--text-primary)",
        brand: {
          blue: "var(--text-primary)",
          cyan: "var(--accent)",
          green: "var(--accent-hover)"
        }
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
        mono: ["var(--font-code)"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.45)",
        gold: "0 24px 70px color-mix(in srgb, var(--accent) 18%, transparent)"
      }
    }
  },
  plugins: []
};

export default config;
