import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

/**
 * Post bodies are plain markdown, so no `prose` plugin is involved — every element
 * is mapped explicitly to the site's design tokens instead.
 */
const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h2
      className="mt-12 scroll-mt-24 font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 scroll-mt-24 font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 scroll-mt-24 font-display text-xl font-semibold text-text-primary sm:text-2xl"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-8 scroll-mt-24 text-lg font-semibold text-text-primary" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-6 text-base leading-8 text-text-secondary" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = /^https?:\/\//.test(href);
    const className = "text-accent underline underline-offset-4 hover:text-accent-hover";

    return isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props} />
    ) : (
      <Link href={href} className={className} {...props} />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-8 text-text-secondary" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-2 pl-6 text-base leading-8 text-text-secondary"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-8 border-l-2 border-accent-border bg-accent-subtle/40 px-5 py-3 italic text-text-secondary"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-12 border-border" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mono mt-6 overflow-x-auto rounded-xl border border-border bg-bg-card p-4 text-sm leading-6 text-text-primary"
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    // Fenced blocks arrive with a `language-*` class and are wrapped in <pre>, which
    // already supplies the styling — only inline code needs the badge treatment.
    <code
      className={cn(
        "mono",
        className ?? "rounded bg-accent-subtle px-1.5 py-0.5 text-[0.9em] text-text-primary",
      )}
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm text-text-secondary" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-border px-3 py-2 font-semibold text-text-primary" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border px-3 py-2" {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="max-w-3xl">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
