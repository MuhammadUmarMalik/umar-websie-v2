import { NextRequest, NextResponse } from "next/server";
import { eq, and, count } from "drizzle-orm";
import { db } from "@/lib/db";
import { likes } from "@/lib/schema";
import { rateLimit } from "@/lib/rate-limit";

function getVisitorId(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const cookie = req.cookies.get("vid")?.value ?? "";
  return `${ip}:${cookie}`;
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const visitorId = getVisitorId(req);

  const [countResult] = await db
    .select({ value: count() })
    .from(likes)
    .where(eq(likes.postSlug, slug));

  const [existing] = await db
    .select({ id: likes.id })
    .from(likes)
    .where(and(eq(likes.postSlug, slug), eq(likes.visitorId, visitorId)))
    .limit(1);

  return NextResponse.json({
    count: countResult?.value ?? 0,
    liked: !!existing,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const ip = getIp(req);

  if (!rateLimit(ip, 30, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const visitorId = getVisitorId(req);

  const [existing] = await db
    .select({ id: likes.id })
    .from(likes)
    .where(and(eq(likes.postSlug, slug), eq(likes.visitorId, visitorId)))
    .limit(1);

  if (existing) {
    await db
      .delete(likes)
      .where(and(eq(likes.postSlug, slug), eq(likes.visitorId, visitorId)));
  } else {
    await db.insert(likes).values({ postSlug: slug, visitorId });
  }

  const [countResult] = await db
    .select({ value: count() })
    .from(likes)
    .where(eq(likes.postSlug, slug));

  const res = NextResponse.json({
    count: countResult?.value ?? 0,
    liked: !existing,
  });

  if (!req.cookies.get("vid")) {
    res.cookies.set("vid", crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return res;
}
