import { type NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sendNotificationEmail } from "@/lib/mail";

interface LeadData {
  name: string;
  email: string;
  details: string;
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req);
    if (!rateLimit(ip, 10, 3600_000)) {
      return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { name, email, details } = (await req.json()) as LeadData;

    if (!name || !email || !details) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email." }, { status: 400 });
    }

    const results: string[] = [];

    // Email via SMTP (Nodemailer — free with Gmail app password or Brevo)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const sent = await sendNotificationEmail({
        to: process.env.CONTACT_EMAIL_TO || "umarmalik.cs711@gmail.com",
        subject: `🤖 Chatbot Lead: ${name}`,
        html: `<h2>New Lead from Next Level Chat Bot</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Project Details:</strong></p>
<p>${escapeHtml(details)}</p>`,
      });
      results.push(sent ? "email:sent" : "email:failed");
    }

    // Telegram webhook
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const esc = (s: string) => s.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
        const text = `🤖 *Chatbot Lead*\n*Name:* ${esc(name)}\n*Email:* ${esc(email)}\n*Details:* ${esc(details)}`;
        await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text,
              parse_mode: "MarkdownV2",
            }),
          },
        );
        results.push("telegram:sent");
      } catch {
        results.push("telegram:error");
      }
    }

    // Slack webhook
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🤖 *Chatbot Lead*\n>*Name:* ${name}\n>*Email:* ${email}\n>*Details:* ${details}`,
          }),
        });
        results.push("slack:sent");
      } catch {
        results.push("slack:error");
      }
    }

    // Google Apps Script (existing in project)
    if (process.env.GOOGLE_APPS_SCRIPT_URL) {
      try {
        await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            message: `[Chatbot Lead] ${details}`,
            source: "chatbot",
          }),
        });
        results.push("sheet:sent");
      } catch {
        results.push("sheet:error");
      }
    }

    return Response.json({ success: true, channels: results });
  } catch {
    return Response.json({ error: "Failed to process lead." }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
