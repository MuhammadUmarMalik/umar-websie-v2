import Link from "next/link";
import { cn } from "@/lib/utils";

export interface TagBadgeProps {
  tag: string;
  /** When set, the badge renders as a link (e.g. a tag filter). */
  href?: string;
  active?: boolean;
  className?: string;
}

export function TagBadge({ tag, href, active = false, className }: TagBadgeProps) {
  const classes = cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
    active
      ? "border-accent-border bg-accent-subtle text-accent"
      : "border-border text-text-secondary hover:border-accent-border hover:text-text-primary",
    className,
  );

  if (!href) {
    return <span className={classes}>{tag}</span>;
  }

  return (
    <Link href={href} className={classes} aria-current={active ? "true" : undefined}>
      {tag}
    </Link>
  );
}
