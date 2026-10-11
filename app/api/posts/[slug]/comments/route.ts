import { NextRequest, NextResponse } from "next/server";
import { eq, and, isNull } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { comments } from "@/lib/schema";
import { rateLimit } from "@/lib/rate-limit";

const URL_RE = /https?:\/\//gi;
const MAX_LINKS = 2;
const MAX_BODY_LENGTH = 2000;

const commentSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  body: z.string().trim().min(1).max(MAX_BODY_LENGTH),
  parentId: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const rows = await db
    .select({
      id: comments.id,
      name: comments.name,
      body: comments.body,
      parentId: comments.parentId,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .where(and(eq(comments.postSlug, slug), eq(comments.status, "approved")))
    .orderBy(comments.createdAt);

  const topLevel = rows.filter((c) => !c.parentId);
  const replies = rows.filter((c) => c.parentId);

  const threaded = topLevel.map((c) => ({
    ...c,
    replies: replies.filter((r) => r.parentId === c.id),
  }));

  return NextResponse.json(threaded);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const ip = getIp(req);

  if (!rateLimit(ip, 5, 3600_000)) {
    return NextResponse.json({ error: "Too many comments. Try later." }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = commentSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { name, email, body, parentId, honeypot } = parsed.data;

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const linkCount = (body.match(URL_RE) ?? []).length;
  if (linkCount > MAX_LINKS) {
    return NextResponse.json({ error: "Too many links" }, { status: 400 });
  }

  if (parentId) {
    const [parent] = await db
      .select({ id: comments.id, parentId: comments.parentId })
      .from(comments)
      .where(eq(comments.id, parentId))
      .limit(1);
    if (!parent || parent.parentId) {
      return NextResponse.json({ error: "Invalid parent comment" }, { status: 400 });
    }
  }

  const autoApprove = process.env.AUTO_APPROVE_COMMENTS === "true";

  await db.insert(comments).values({
    postSlug: slug,
    name: escapeHtml(name),
    email,
    body: escapeHtml(body),
    parentId: parentId ?? null,
    status: autoApprove ? "approved" : "pending",
  });

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM ?? "onboarding@resend.dev",
        to: process.env.CONTACT_EMAIL_TO ?? "umarmalik.cs711@gmail.com",
        subject: `New comment on "${slug}" by ${escapeHtml(name)}`,
        html: `
          <p><strong>${escapeHtml(name)}</strong> commented on <em>${slug}</em>:</p>
          <blockquote style="border-left:3px solid #7c3aed;padding:8px 16px;margin:16px 0;background:#f9fafb">${escapeHtml(body)}</blockquote>
          <p style="color:#6b7280;font-size:14px">${autoApprove ? "Auto-approved" : "Pending moderation"} &middot; <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/comments">Manage</a></p>
        `,
      });
    } catch (err) {
      console.error("[comments] Resend failed:", err);
    }
  }

  return NextResponse.json({ ok: true, status: autoApprove ? "approved" : "pending" });
}
