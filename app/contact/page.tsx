"use client";

import { ArrowRight, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/constants";

const businessTypes = [
  "E-commerce",
  "Service Business",
  "Restaurant",
  "Startup",
  "Other",
];

const budgetRanges = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$3,000",
  "$3,000+",
  "Not sure yet",
];

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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
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

  const inputClass =
    "w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none transition-colors duration-200";
  const labelClass = "mono mb-2 block text-xs uppercase text-text-secondary";

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 pb-16 pt-36 md:px-12 lg:px-20 lg:pt-48">
        <div className="mx-auto max-w-320">
          <p className="mono mb-4 text-sm uppercase text-accent">Contact</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            Let&apos;s Build Something Together.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Tell me about your business and what you&apos;re trying to fix. I&apos;ll get back to
            you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div>
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-accent/40 bg-bg-card p-10">
                <span className="text-3xl">✓</span>
                <h2 className="font-display text-2xl font-bold">Message received!</h2>
                <p className="text-text-secondary">
                  I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mono mt-2 text-sm uppercase text-accent transition-colors duration-200 hover:text-accent-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
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
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-10">
            <div className="rounded-2xl border border-border bg-bg-card p-8">
              <h2 className="mb-6 font-display text-2xl font-bold">Prefer to Talk Directly?</h2>
              <p className="mb-6 leading-7 text-text-secondary">
                Book a free 30-minute discovery call. We&apos;ll talk about your business, your
                goals, and whether we&apos;re a good fit.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-border px-8 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Schedule a Call
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p className="text-text-secondary">Based in Pakistan — Working Globally</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p className="text-text-secondary">Response time: Within 24 hours</p>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p className="text-text-secondary">
                  Available via: Email · WhatsApp · Video Call
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
