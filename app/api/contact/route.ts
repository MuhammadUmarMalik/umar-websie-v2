import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  process.env.GOOGLE_APPS_SCRIPT_URL ??
  "https://script.google.com/macros/s/AKfycbwqAg9-ZjYcXYD7u-eVf3l67_KTjhaZ-Kiiy6mDZ1YRmSVXgemAvWBZJrkkGolB9_LJzg/exec";

// ── Rate limiting ─────────────────────────────────────────────────────────────
// In-memory store keyed by IP. Resets per cold start (acceptable for a portfolio
// contact form). Prevents rapid-fire spam within a single function instance.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;        // max submissions
const RATE_WINDOW_MS = 3600_000; // per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

// ── Input helpers ─────────────────────────────────────────────────────────────
// Strip HTML tags to prevent XSS in the email notification
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Truncate to avoid oversized payloads
function sanitize(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return escapeHtml(value.trim().slice(0, maxLen));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function postToSheet(payload: Record<string, string>) {
  const body = JSON.stringify(payload);
  const headers = { "Content-Type": "application/json" };

  // Step 1: send POST but don't auto-follow redirects —
  // fetch turns POST→GET on 302, which loses the body.
  const first = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers,
    body,
    redirect: "manual",
  });

  // Step 2: follow the redirect ourselves, keeping POST + body intact.
  if (first.status >= 300 && first.status < 400) {
    const location = first.headers.get("location");
    if (location) {
      const second = await fetch(location, { method: "POST", headers, body });
      if (!second.ok) {
        console.error("[contact] Apps Script redirect response:", second.status, await second.text());
      }
      return;
    }
  }

  if (!first.ok && first.status < 300) {
    console.error("[contact] Apps Script response:", first.status);
  }
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ───────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ── Parse & sanitize input ──────────────────────────────────────────────
    let raw: Record<string, unknown>;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Honeypot: bots fill hidden fields, humans don't
    if (raw.honeypot) {
      // Return 200 to fool bots, but don't process
      return NextResponse.json({ ok: true });
    }

    const name = sanitize(raw.name, 100);
    const email = sanitize(raw.email, 200);
    const country = sanitize(raw.country, 100);
    const projectType = sanitize(raw.projectType, 100);
    const deadline = sanitize(raw.deadline, 100);
    const referral = sanitize(raw.referral, 100);
    const message = sanitize(raw.message, 2000);
    const sourcePath = sanitize(raw.sourcePath, 200);

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent")?.slice(0, 300) ?? "";

    const payload: Record<string, string> = {
      Timestamp: new Date().toISOString(),
      Name: name,
      Email: email,
      Country: country,
      "Project Type": projectType,
      Deadline: deadline,
      "Referral Source": referral,
      Message: message,
      "User Agent": userAgent,
      Form: "Contact",
      "Source Path": sourcePath,
    };

    // ── Google Sheet ──────────────────────────────────────────────────────────
    try {
      await postToSheet(payload);
    } catch (err) {
      console.error("[contact] postToSheet failed:", err);
    }

    // ── Resend email notification (optional) ──────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      try {
        const toEmail = process.env.CONTACT_EMAIL_TO ?? "umarmalik.cs711@gmail.com";
        const fromEmail = process.env.CONTACT_EMAIL_FROM ?? "onboarding@resend.dev";
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: `New lead from ${name}`,
          // All values are already HTML-escaped by sanitize()
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <h2 style="color:#7c3aed">New Contact Form Submission</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#6b7280;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">Country</td><td style="padding:8px 0">${country || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">Project Type</td><td style="padding:8px 0">${projectType || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">Deadline</td><td style="padding:8px 0">${deadline || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">Found via</td><td style="padding:8px 0">${referral || "—"}</td></tr>
              </table>
              ${message ? `<h3 style="margin-top:24px">Message</h3><p style="white-space:pre-wrap;background:#f9fafb;padding:16px;border-radius:8px">${message}</p>` : ""}
            </div>
          `,
        });
      } catch (err) {
        console.error("[contact] Resend failed:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
