import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TagBadge } from "@/components/blog/TagBadge";
import { formatPostDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: string;
  slug: string;
  tags: string[];
  readingMinutes: number;
  className?: string;
}

export function BlogCard({
  title,
  excerpt,
  date,
  coverImage,
  slug,
  tags,
  readingMinutes,
  className,
}: BlogCardProps) {
  const href = `/blog/${slug}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-card transition-colors duration-200 hover:border-accent/30",
        className,
      )}
    >
      {coverImage && (
        <div className="overflow-hidden">
          <Image
            src={coverImage}
            alt=""
            width={800}
            height={400}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {tags.slice(0, 2).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <h3 className="mb-2 text-xl font-semibold leading-snug text-text-primary">
          <Link href={href} className="transition-colors hover:text-accent">
            {/* Stretch the link over the whole card so the entire surface is clickable */}
            <span className="absolute inset-0" aria-hidden />
            {title}
          </Link>
        </h3>

        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-text-secondary">
          <time dateTime={date}>{formatPostDate(date)}</time>
          <span>{readingMinutes} min read</span>
        </div>

        <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
          Read article
          <ArrowRight
            className="ml-1 size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </article>
  );
}
