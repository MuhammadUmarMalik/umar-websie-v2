import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount?: number;
  /** Route the page links point at. */
  basePath?: string;
  /** Extra query params (e.g. an active tag filter) preserved across pages. */
  query?: Record<string, string | undefined>;
  className?: string;
}

const MAX_VISIBLE = 5;

/** A window of at most MAX_VISIBLE page numbers centred on `currentPage`. */
function visiblePages(currentPage: number, totalPages: number): number[] {
  const start = Math.max(
    1,
    Math.min(currentPage - Math.floor(MAX_VISIBLE / 2), totalPages - MAX_VISIBLE + 1),
  );
  const end = Math.min(totalPages, start + MAX_VISIBLE - 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  basePath = "/blog",
  query,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value) params.set(key, value);
    }
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const linkClass =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-3 text-sm transition-colors hover:border-accent-border hover:text-text-primary";

  return (
    <nav
      aria-label="Blog pagination"
      className={cn(
        "mt-12 flex flex-col-reverse items-center justify-between gap-4 text-sm text-text-secondary sm:flex-row",
        className,
      )}
    >
      <span>
        Page {currentPage} of {totalPages}
        {typeof totalCount === "number" && ` — ${totalCount} article${totalCount === 1 ? "" : "s"}`}
      </span>

      <div className="flex items-center gap-1">
        {currentPage > 1 && (
          <Link href={hrefFor(currentPage - 1)} className={linkClass} aria-label="Previous page">
            <ChevronLeft className="size-4" aria-hidden />
          </Link>
        )}

        {visiblePages(currentPage, totalPages).map((page) => (
          <Link
            key={page}
            href={hrefFor(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              linkClass,
              page === currentPage &&
                "border-accent bg-accent text-accent-foreground hover:text-accent-foreground",
            )}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link href={hrefFor(currentPage + 1)} className={linkClass} aria-label="Next page">
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </nav>
  );
}
