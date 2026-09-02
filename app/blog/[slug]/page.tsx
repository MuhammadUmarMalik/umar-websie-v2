import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { MdxContent } from "@/components/blog/MdxContent";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const image = post.coverImage || "/opengraph-image";

  return {
    // `absolute` skips the site-wide "%s | Muhammad Umar Malik" template — post titles
    // are already long enough that the suffix pushes them past the SERP cutoff.
    title: { absolute: post.seoTitle || post.title },
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <main className="bg-bg-primary text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              description: post.excerpt,
              slug: post.slug,
              date: post.date,
              author: post.author,
              image: post.coverImage,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(post.faqs)) }}
        />
      )}

      <article className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32 md:px-12 lg:px-20 lg:pt-40 2xl:px-28">
        <div className="mx-auto max-w-3xl">
          <BlogHeader
            title={post.title}
            date={post.date}
            author={post.author}
            coverImage={post.coverImage}
            coverImageAlt={post.coverImageAlt}
            readingMinutes={post.readingMinutes}
            tags={post.tags}
          />

          <MdxContent source={post.content} />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-border px-4 py-16 sm:px-6 md:px-12 lg:px-20 2xl:px-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-display text-2xl font-bold text-text-primary sm:text-3xl">
              Related articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} {...related} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 pb-24 sm:px-6 md:px-12 lg:px-20 2xl:px-28">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/contact"
            className="inline-flex items-center text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Have a project like this? Let&apos;s talk
            <ArrowRight className="ml-1 size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
