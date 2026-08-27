import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// --- Types ---

export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
}

/** Frontmatter plus derived fields — everything needed to render a listing card. */
export interface BlogPostMeta extends BlogFrontmatter {
  /** Estimated read time in whole minutes (minimum 1). */
  readingMinutes: number;
}

/** A full post, including its raw MDX body. */
export interface BlogPost extends BlogPostMeta {
  content: string;
}

// --- Helpers ---

function readPostFile(file: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as Partial<BlogFrontmatter>;

  return {
    title: frontmatter.title ?? "Untitled",
    slug: frontmatter.slug || file.replace(/\.mdx?$/, ""),
    date: frontmatter.date ?? new Date(0).toISOString(),
    excerpt: frontmatter.excerpt ?? "",
    coverImage: frontmatter.coverImage ?? "",
    author: frontmatter.author ?? "Muhammad Umar Malik",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

function readAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readPostFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// --- Exports ---

/** All posts, newest first. Body content is stripped — use `getPostBySlug` for that. */
export function getAllPosts(): BlogPostMeta[] {
  return readAllPosts().map((post) => {
    const meta: BlogPostMeta & { content?: string } = { ...post };
    delete meta.content;
    return meta;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  return readAllPosts().find((post) => post.slug === slug) ?? null;
}

/** Every tag used across all posts, sorted by frequency then alphabetically. */
export function getAllTags(): string[] {
  const counts = new Map<string, number>();
  for (const post of readAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

/** Posts sharing at least one tag with `post`, most overlap first. */
export function getRelatedPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      overlap: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/** Shared date formatting so listing cards and post headers stay in sync. */
export function formatPostDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
