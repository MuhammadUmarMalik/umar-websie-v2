import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TagBadge } from "@/components/blog/TagBadge";
import { formatPostDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

export interface BlogHeaderProps {
  title: string;
  date: string;
  author: string;
  coverImage: string;
  readingMinutes: number;
  tags?: string[];
  className?: string;
}

export function BlogHeader({
  title,
  date,
  author,
  coverImage,
  readingMinutes,
  tags = [],
  className,
}: BlogHeaderProps) {
  return (
    <header className={cn("mb-10", className)}>
      <Link
        href="/blog"
        className="mono inline-flex items-center text-sm text-text-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="mr-1 size-4" aria-hidden />
        All articles
      </Link>

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} />
          ))}
        </div>
      )}

      <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>

      <p className="mt-5 text-sm text-text-secondary">
        {author}
        <span aria-hidden className="mx-2">
          •
        </span>
        <time dateTime={date}>{formatPostDate(date)}</time>
        <span aria-hidden className="mx-2">
          •
        </span>
        {readingMinutes} min read
      </p>

      {coverImage && (
        <Image
          src={coverImage}
          alt=""
          width={1200}
          height={630}
          priority
          sizes="(min-width: 1024px) 900px, 100vw"
          className="mt-8 aspect-video w-full rounded-xl border border-border object-cover"
        />
      )}
    </header>
  );
}
