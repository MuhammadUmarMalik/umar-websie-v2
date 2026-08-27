import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

/** Only these hosts may be screenshotted — stops the route being an open proxy. */
const ALLOWED_HOSTS = new Set([
  "www.tripit.com",
  "www.javisgravy.com",
  "www.babi.sh",
  "www.edusuite.pk",
  "www.extendicare.com",
]);

/**
 * The preview card renders at 340x210 CSS px with `object-fit: cover` /
 * `object-position: top`, so 2x of that crop is all the pixels we can show.
 * Serving the raw ~1.3 MB Microlink capture wasted ~95% of the bytes.
 */
const OUT_W = 680;
const OUT_H = 420;

const DAY_S = 86_400;
const TTL_MS = 30 * DAY_S * 1000;

/** Warm-instance memo. The CDN headers below are what actually carry the cache. */
const cache = new Map<string, { body: Uint8Array<ArrayBuffer>; ts: number }>();

/**
 * Copies into a plain `ArrayBuffer`-backed view. `new Uint8Array(buf)` widens to
 * `ArrayBufferLike`, which TS won't accept as a `BodyInit`.
 */
function toBody(buf: Buffer): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(buf.byteLength);
  out.set(buf);
  return out;
}

/**
 * Browser holds it a day, the CDN a month, and serves stale for a week while
 * revalidating — a marketing-site screenshot does not change hour to hour.
 */
const CACHE_HEADERS = {
  "Content-Type": "image/webp",
  "Cache-Control": `public, max-age=${DAY_S}, s-maxage=${30 * DAY_S}, stale-while-revalidate=${7 * DAY_S}`,
} as const;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return new NextResponse("Missing url param", { status: 400 });
  }

  let host: string;
  try {
    host = new URL(url).host;
  } catch {
    return new NextResponse("Invalid url param", { status: 400 });
  }
  if (!ALLOWED_HOSTS.has(host)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  const hit = cache.get(url);
  if (hit && Date.now() - hit.ts < TTL_MS) {
    return new NextResponse(hit.body, { headers: CACHE_HEADERS });
  }

  try {
    // Step 1: ask Microlink for the screenshot metadata (JSON)
    const apiUrl =
      `https://api.microlink.io/?url=${encodeURIComponent(url)}` +
      `&screenshot=true&meta=false`;

    const metaRes = await fetch(apiUrl, {
      signal: AbortSignal.timeout(15_000),
      // Persist across invocations so a cold lambda doesn't re-bill Microlink
      next: { revalidate: 30 * DAY_S },
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

    // Step 3: crop to the slot we actually render and re-encode as WebP
    const body = toBody(
      await sharp(Buffer.from(await imgRes.arrayBuffer()))
        .resize(OUT_W, OUT_H, { fit: "cover", position: "top" })
        .webp({ quality: 78 })
        .toBuffer(),
    );

    cache.set(url, { body, ts: Date.now() });

    return new NextResponse(body, { headers: CACHE_HEADERS });
  } catch {
    return new NextResponse("Screenshot timeout", { status: 504 });
  }
}
