import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { isAuthenticated } from "@/lib/auth";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    title,
    seoTitle,
    slug,
    date,
    excerpt,
    coverImage,
    coverImageAlt,
    author,
    tags,
    body: content,
    faqs,
  } = body;

  if (!title || !slug || !date || !excerpt || !content) {
    return NextResponse.json(
      { error: "title, slug, date, excerpt, and body are required" },
      { status: 400 },
    );
  }

  // Sanitize slug
  const safeSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const filePath = path.join(BLOG_DIR, `${safeSlug}.mdx`);

  if (fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "A post with this slug already exists" },
      { status: 409 },
    );
  }

  // Build frontmatter
  const fm: Record<string, unknown> = {
    title,
    slug: safeSlug,
    date,
    excerpt,
    coverImage: coverImage || "",
    author: author || "Muhammad Umar Malik",
    tags: Array.isArray(tags) ? tags : [],
  };
  if (seoTitle) fm.seoTitle = seoTitle;
  if (coverImageAlt) fm.coverImageAlt = coverImageAlt;
  if (Array.isArray(faqs) && faqs.length > 0) fm.faqs = faqs;

  const yaml = Object.entries(fm)
    .map(([key, val]) => {
      if (Array.isArray(val) && typeof val[0] === "object") {
        // faqs array of objects
        return `${key}:\n${(val as Array<Record<string, string>>)
          .map((item) => `  - question: ${JSON.stringify(item.question)}\n    answer: ${JSON.stringify(item.answer)}`)
          .join("\n")}`;
      }
      if (Array.isArray(val)) {
        return `${key}: [${val.map((v) => JSON.stringify(v)).join(", ")}]`;
      }
      return `${key}: ${JSON.stringify(val)}`;
    })
    .join("\n");

  const mdx = `---\n${yaml}\n---\n\n${content}\n`;

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(filePath, mdx, "utf-8");

  return NextResponse.json({ slug: safeSlug });
}
