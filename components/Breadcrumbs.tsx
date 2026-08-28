import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  href: string;
}

/**
 * Visible counterpart to `breadcrumbSchema()`. Google increasingly expects
 * BreadcrumbList markup to describe navigation the user can actually see, so
 * the two should always be rendered from the same array of crumbs.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="mono flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs uppercase tracking-widest text-text-secondary">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-x-1.5">
              {isLast ? (
                <span aria-current="page" className="text-accent">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-text-primary"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="size-3 shrink-0 opacity-50" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
