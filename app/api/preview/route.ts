import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { buffer: ArrayBuffer; type: string; ts: number }>();
const TTL_MS = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return new NextResponse("Missing url param", { status: 400 });
  }

  // Serve from in-memory cache if fresh
  const hit = cache.get(url);
  if (hit && Date.now() - hit.ts < TTL_MS) {
    return new NextResponse(hit.buffer, {
      headers: {
        "Content-Type": hit.type,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  try {
    const apiUrl =
      `https://api.microlink.io/?url=${encodeURIComponent(url)}` +
      `&screenshot=true&meta=false&embed=screenshot.url`;

    const res = await fetch(apiUrl, {
      // follow redirects to the actual image
      redirect: "follow",
      signal: AbortSignal.timeout(12_000),
    });

    if (!res.ok) {
      return new NextResponse("Screenshot unavailable", { status: 502 });
    }

    const type = res.headers.get("Content-Type") ?? "image/png";
    const buffer = await res.arrayBuffer();

    cache.set(url, { buffer, type, ts: Date.now() });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Screenshot timeout", { status: 504 });
  }
}
