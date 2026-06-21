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
        /* Core */
        background: "var(--background)",
        foreground: "var(--foreground)",

        /* Surfaces */
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        surface: "var(--surface)",
        "surface-secondary": "var(--surface-secondary)",

        /* Primary */
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-foreground": "var(--primary-foreground)",

        /* Accent */
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-foreground": "var(--accent-foreground)",

        /* Text */
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",

        /* Borders */
        border: "var(--border)",
        "border-strong": "var(--border-strong)",

        /* States */
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",

        /* Legacy aliases — existing components keep working */
        "bg-primary": "var(--background)",
        "bg-secondary": "var(--surface-secondary)",
        "bg-card": "var(--card)",
        ink: "var(--text-primary)",
        muted: "var(--text-secondary)",
        line: "var(--border)",
        night: "var(--background)",
        chalk: "var(--text-primary)",
        brand: {
          blue: "var(--text-primary)",
          cyan: "var(--primary)",
          green: "var(--accent)"
        }
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
        mono: ["var(--font-code)"]
      },
      backgroundImage: {
        "hero-gradient": "var(--hero-gradient)",
        "cta-gradient": "var(--cta-gradient)"
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        soft: "0 24px 80px rgba(0, 0, 0, 0.45)",
        brand: "0 24px 70px rgba(0, 0, 0, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;
