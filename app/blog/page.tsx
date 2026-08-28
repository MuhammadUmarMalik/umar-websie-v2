import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/blog/Pagination";
import { TagBadge } from "@/components/blog/TagBadge";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbSchema, createMetadata, seoMap } from "@/lib/seo";

export const metadata: Metadata = createMetadata(seoMap.blog);

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
];

const PAGE_SIZE = 6;

interface BlogPageProps {
  searchParams: Promise<{ page?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, tag } = await searchParams;

  const allPosts = getAllPosts();
  const tags = getAllTags();
  const activeTag = tag && tags.includes(tag) ? tag : undefined;
  const posts = activeTag ? allPosts.filter((post) => post.tags.includes(activeTag)) : allPosts;

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const currentPage = Number(page ?? "1");
  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  const paginatedPosts = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <main className="bg-bg-primary text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(CRUMBS)),
        }}
      />

      {/* Hero */}
      <section className="px-4 pb-12 pt-28 sm:px-6 sm:pt-32 md:px-12 lg:px-20 lg:pt-48 2xl:px-28">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={CRUMBS} />
          <p className="mono mb-4 text-sm uppercase tracking-widest text-accent">Blog</p>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl">
            Web Design, Conversion &amp; Automation Blog
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Notes on building better websites — practical articles about conversion, speed, UI/UX,
            and business automation for small businesses.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-4 pb-24 sm:px-6 md:px-12 lg:px-20 2xl:px-28">
        <div className="mx-auto max-w-7xl">
          {tags.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              <TagBadge tag="All" href="/blog" active={!activeTag} />
              {tags.map((name) => (
                <TagBadge
                  key={name}
                  tag={name}
                  href={`/blog?tag=${encodeURIComponent(name)}`}
                  active={name === activeTag}
                />
              ))}
            </div>
          )}

          {paginatedPosts.length === 0 ? (
            <p className="text-text-secondary">
              No articles published yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={posts.length}
            query={{ tag: activeTag }}
          />
        </div>
      </section>
    </main>
  );
}
