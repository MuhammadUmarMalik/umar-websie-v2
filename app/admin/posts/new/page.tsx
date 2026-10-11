"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverImageAlt, setCoverImageAlt] = useState("");
  const [author, setAuthor] = useState("Muhammad Umar Malik");
  const [tagsInput, setTagsInput] = useState("");
  const [body, setBody] = useState("");
  const [inlineImages, setInlineImages] = useState([
    { url: "", alt: "" },
    { url: "", alt: "" },
    { url: "", alt: "" },
  ]);

  // FAQ state
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);

  function autoSlug(t: string) {
    return t
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Build image markdown snippets to inject into the body
    const imageMarkdown = inlineImages
      .filter((img) => img.url)
      .map((img) => `![${img.alt || ""}](${img.url})`)
      .join("\n\n");

    const fullBody = imageMarkdown
      ? `${body}\n\n${imageMarkdown}`
      : body;

    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        seoTitle: seoTitle || undefined,
        slug: slug || autoSlug(title),
        date,
        excerpt,
        coverImage,
        coverImageAlt: coverImageAlt || undefined,
        author,
        tags,
        body: fullBody,
        faqs: faqs.length > 0 ? faqs : undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create post");
      setSaving(false);
      return;
    }

    const { slug: createdSlug } = await res.json();
    router.push(`/blog/${createdSlug}`);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
  const labelClass = "mb-1 block text-sm font-medium text-text-secondary";

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-bold">New Post</h1>

      {error && (
        <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className={labelClass}>Title *</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slug) setSlug(autoSlug(e.target.value));
            }}
            placeholder="My Awesome Post"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass}>Slug *</label>
          <input
            className={inputClass}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-awesome-post"
            required
          />
          <p className="mt-1 text-xs text-text-secondary">
            URL: /blog/{slug || "..."}
          </p>
        </div>

        {/* Date & Author row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Date *</label>
            <input
              type="date"
              className={inputClass}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Author</label>
            <input
              className={inputClass}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className={labelClass}>Excerpt / Meta Description *</label>
          <textarea
            className={`${inputClass} min-h-[80px] resize-y`}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A compelling summary for search engines and social cards..."
            required
          />
          <p className="mt-1 text-xs text-text-secondary">
            {excerpt.length}/160 characters (ideal for meta description)
          </p>
        </div>

        {/* Cover Image */}
        <fieldset className="space-y-3 rounded-xl border border-border p-4">
          <legend className="px-2 text-sm font-medium text-text-secondary">
            Cover Image
          </legend>
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              className={inputClass}
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>Alt Text</label>
            <input
              className={inputClass}
              value={coverImageAlt}
              onChange={(e) => setCoverImageAlt(e.target.value)}
              placeholder="Descriptive alt text for accessibility"
            />
          </div>
          {coverImage && (
            <img
              src={coverImage}
              alt={coverImageAlt || "Preview"}
              className="h-40 w-full rounded-lg object-cover"
            />
          )}
        </fieldset>

        {/* Tags */}
        <div>
          <label className={labelClass}>Tags</label>
          <input
            className={inputClass}
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="React, Next.js, TypeScript (comma separated)"
          />
        </div>

        {/* SEO */}
        <fieldset className="space-y-3 rounded-xl border border-border p-4">
          <legend className="px-2 text-sm font-medium text-text-secondary">
            SEO
          </legend>
          <div>
            <label className={labelClass}>
              SEO Title{" "}
              <span className="font-normal text-text-secondary/60">
                (overrides title in {"<title>"} tag)
              </span>
            </label>
            <input
              className={inputClass}
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Shorter title for search results"
            />
            <p className="mt-1 text-xs text-text-secondary">
              {(seoTitle || title).length}/60 characters
            </p>
          </div>
        </fieldset>

        {/* FAQs for structured data */}
        <fieldset className="space-y-3 rounded-xl border border-border p-4">
          <legend className="px-2 text-sm font-medium text-text-secondary">
            FAQs (structured data)
          </legend>
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-2 rounded-lg bg-bg-secondary p-3">
              <input
                className={inputClass}
                value={faq.question}
                onChange={(e) => {
                  const next = [...faqs];
                  next[i] = { ...next[i], question: e.target.value };
                  setFaqs(next);
                }}
                placeholder="Question"
              />
              <textarea
                className={`${inputClass} min-h-[60px] resize-y`}
                value={faq.answer}
                onChange={(e) => {
                  const next = [...faqs];
                  next[i] = { ...next[i], answer: e.target.value };
                  setFaqs(next);
                }}
                placeholder="Answer"
              />
              <button
                type="button"
                onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}
                className="text-xs text-danger hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
            className="text-sm text-accent hover:underline"
          >
            + Add FAQ
          </button>
        </fieldset>

        {/* Inline Images */}
        <fieldset className="space-y-3 rounded-xl border border-border p-4">
          <legend className="px-2 text-sm font-medium text-text-secondary">
            Inline Images (inserted between sections)
          </legend>
          {inlineImages.map((img, i) => (
            <div key={i} className="grid gap-2 rounded-lg bg-bg-secondary p-3 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Image {i + 1} URL</label>
                <input
                  className={inputClass}
                  value={img.url}
                  onChange={(e) => {
                    const next = [...inlineImages];
                    next[i] = { ...next[i], url: e.target.value };
                    setInlineImages(next);
                  }}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div>
                <label className={labelClass}>Alt Text</label>
                <input
                  className={inputClass}
                  value={img.alt}
                  onChange={(e) => {
                    const next = [...inlineImages];
                    next[i] = { ...next[i], alt: e.target.value };
                    setInlineImages(next);
                  }}
                  placeholder="Descriptive alt text"
                />
              </div>
              {img.url && (
                <img
                  src={img.url}
                  alt={img.alt || "Preview"}
                  className="h-24 w-full rounded-lg object-cover sm:col-span-2"
                />
              )}
            </div>
          ))}
          <p className="text-xs text-text-secondary">
            These will be auto-inserted as markdown images. You can also paste
            image markdown directly in the body.
          </p>
        </fieldset>

        {/* Body */}
        <div>
          <label className={labelClass}>Body (MDX) *</label>
          <textarea
            className={`${inputClass} min-h-[300px] resize-y font-mono text-xs`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={"# My Heading\n\nWrite your post content in Markdown..."}
            required
          />
          <p className="mt-1 text-xs text-text-secondary">
            Supports Markdown. Avoid raw {"{}"} and {"<tag>"} syntax (MDX
            constraint).
          </p>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {saving ? "Publishing..." : "Publish Post"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-border px-6 py-2.5 text-sm text-text-secondary transition-colors hover:bg-bg-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
