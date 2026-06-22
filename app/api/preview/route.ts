import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { buffer: ArrayBuffer; type: string; ts: number }>();
const TTL_MS = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return new NextResponse("Missing url param", { status: 400 });
  }

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
    // Step 1: ask Microlink for the screenshot metadata (JSON)
    const apiUrl =
      `https://api.microlink.io/?url=${encodeURIComponent(url)}` +
      `&screenshot=true&meta=false`;

    const metaRes = await fetch(apiUrl, {
      signal: AbortSignal.timeout(15_000),
    });

    if (!metaRes.ok) {
      return new NextResponse("Screenshot unavailable", { status: 502 });
    }

    const json = await metaRes.json();
    const screenshotUrl: string | undefined = json?.data?.screenshot?.url;

    if (!screenshotUrl) {
      return new NextResponse("No screenshot URL in response", { status: 502 });
    }

    // Step 2: proxy the actual image from Microlink's CDN
    const imgRes = await fetch(screenshotUrl, {
      signal: AbortSignal.timeout(8_000),
    });

    if (!imgRes.ok) {
      return new NextResponse("Screenshot image unavailable", { status: 502 });
    }

    const type = imgRes.headers.get("Content-Type") ?? "image/jpeg";
    const buffer = await imgRes.arrayBuffer();

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
