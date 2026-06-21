"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { ArrowRight } from "lucide-react";

const businessTypes = ["E-commerce", "Service Business", "Restaurant", "Startup", "Other"];
const budgetRanges = ["Under $500", "$500–$1,000", "$1,000–$3,000", "$3,000+", "Not sure yet"];
const referralSources = ["LinkedIn", "Google", "Referral", "Other"];

type FormState = {
  name: string;
  email: string;
  businessType: string;
  problem: string;
  budget: string;
  referral: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  businessType: "",
  problem: "",
  budget: "",
  referral: "",
};

const inputClass =
  "w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none transition-colors duration-200";
const labelClass = "mono mb-2 block text-xs uppercase text-text-secondary";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-accent/40 bg-bg-card p-10">
        <span className="text-3xl">✓</span>
        <h2 className="font-display text-2xl font-bold">Message received!</h2>
        <p className="text-text-secondary">I&apos;ll get back to you within 24 hours.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mono mt-2 text-sm uppercase text-text-primary transition-colors duration-200 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="businessType" className={labelClass}>
          Business Type
        </label>
        <select
          id="businessType"
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select your business type</option>
          {businessTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="problem" className={labelClass}>
          What&apos;s your main problem?
        </label>
        <textarea
          id="problem"
          name="problem"
          rows={4}
          value={form.problem}
          onChange={handleChange}
          placeholder="Describe what's broken or what you need"
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a range</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="referral" className={labelClass}>
            How did you find me?
          </label>
          <select
            id="referral"
            name="referral"
            value={form.referral}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a source</option>
            {referralSources.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_28px_color-mix(in_srgb,var(--accent)_40%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </button>
    </form>
  );
}
