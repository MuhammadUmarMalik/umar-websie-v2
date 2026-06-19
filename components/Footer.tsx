"use client";

import Link from "next/link";
import { siteConfig, marketingPages } from "@/lib/constants";

const footerLinks = marketingPages.filter((p) => p.label !== "Services");

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary px-6 py-14 md:px-12 lg:px-20">
      <div className="mx-auto max-w-320">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          <div>
            <p className="mono text-xl font-black uppercase leading-none">
              UMAR MALIK
            </p>
            <p className="mono mt-2 text-sm uppercase text-text-secondary">
              Software Engineer &amp; Designer
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mono text-sm uppercase text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            <Link
              href={siteConfig.socials.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm uppercase text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              LinkedIn
            </Link>
            <Link
              href={siteConfig.socials.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-sm uppercase text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              GitHub
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="mono text-sm uppercase text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              Email
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="mono text-xs uppercase text-text-secondary">
            © {new Date().getFullYear()} Muhammad Umar Malik. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mono text-xs uppercase text-text-secondary transition-colors duration-200 hover:text-accent"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
