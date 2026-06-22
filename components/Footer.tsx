"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { siteConfig, marketingPages, servicePages } from "@/lib/constants";

type SvgIcon = React.ComponentType<React.SVGAttributes<SVGElement>>;

const navLinks = marketingPages.filter((p) => !["Home", "Services"].includes(p.label));

const MailSvg: SvgIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const socialLinks: Array<{ label: string; href: string; icon: SvgIcon; external: boolean }> = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin.href, icon: Icons.linkedin as SvgIcon, external: true, },
  { label: "GitHub", href: siteConfig.socials.github.href, icon: Icons.gitHub as SvgIcon, external: true },
  { label: "Instagram", href: siteConfig.socials.instagram.href, icon: Icons.instagram as SvgIcon, external: true },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: MailSvg, external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary">

{/* ── Main grid ───────────────────────────────────────── */}
      <div className="px-6 py-14 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="mono text-xl font-black uppercase leading-none text-text-primary">
              UMAR MALIK
            </p>
            <p className="mono mt-1 text-xs uppercase tracking-widest text-text-secondary">
              Software Engineer &amp; Designer
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Helping small businesses fix websites, improve UX, generate leads, and automate repetitive work.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="mono text-xs uppercase tracking-widest text-text-secondary">
                Available for work
              </span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="mono mb-5 text-xs uppercase tracking-widest text-text-secondary">
              Pages
            </p>
            <nav aria-label="Footer pages" className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mono text-sm uppercase text-text-secondary transition-colors duration-200 hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <p className="mono mb-5 text-xs uppercase tracking-widest text-text-secondary">
              Services
            </p>
            <nav aria-label="Footer services" className="flex flex-col gap-3">
              {servicePages.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="mono text-sm uppercase text-text-secondary transition-colors duration-200 hover:text-text-primary"
                >
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="mono mb-5 text-xs uppercase tracking-widest text-text-secondary">
              Connect
            </p>
            <nav aria-label="Footer social links" className="flex flex-col gap-3">
              {socialLinks.map(({ label, href, icon: Icon, external }) => (
                <Link
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="mono group inline-flex items-center gap-2 text-sm uppercase text-text-secondary transition-colors duration-200 hover:text-text-primary"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 transition-colors duration-200 group-hover:text-accent" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="mono text-xs uppercase text-text-secondary">
            © {new Date().getFullYear()} Muhammad Umar Malik. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="mono text-xs uppercase text-text-secondary">
              Designed &amp; Built by Umar
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mono group inline-flex cursor-pointer items-center gap-1.5 text-xs uppercase text-text-secondary transition-colors duration-200 hover:text-accent"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Top
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
