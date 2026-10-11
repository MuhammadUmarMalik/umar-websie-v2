import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = "Muhammad Umar Malik <support@umarmalik-dev.com>";
const SITE = "https://www.umarmalik-dev.com";

type ContactFields = {
  name: string;
  email: string;
  country: string;
  projectType: string;
  deadline: string;
  referral: string;
  message: string;
  sourcePath: string;
};

function row(label: string, value: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 12px;color:#71717a;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#1a1a1a;font-size:14px">${value}</td>
    </tr>`;
}

function buildOwnerHtml(f: ContactFields) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">

  <!-- Header -->
  <tr><td style="background:#1a1a1a;padding:24px 32px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.3px">UMAR MALIK</td>
        <td align="right" style="font-size:12px;color:#a1a1aa">New Lead</td>
      </tr>
    </table>
  </td></tr>

  <!-- Accent bar -->
  <tr><td style="height:3px;background:linear-gradient(90deg,#6d28d9,#5b21b6)"></td></tr>

  <!-- Body -->
  <tr><td style="padding:28px 32px">
    <p style="margin:0 0 4px;font-size:20px;font-weight:600;color:#1a1a1a">${f.name}</p>
    <p style="margin:0 0 20px;font-size:14px;color:#6d28d9"><a href="mailto:${f.email}" style="color:#6d28d9;text-decoration:none">${f.email}</a></p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4e4e7;border-radius:8px;overflow:hidden">
      ${row("Country", f.country)}
      ${row("Project", f.projectType)}
      ${row("Deadline", f.deadline)}
      ${row("Referral", f.referral)}
      ${row("Source", f.sourcePath)}
    </table>

    ${f.message ? `
    <div style="margin-top:20px;padding:16px;background:#faf5ff;border-left:3px solid #6d28d9;border-radius:4px">
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#6d28d9;text-transform:uppercase;letter-spacing:0.5px">Message</p>
      <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.6;white-space:pre-wrap">${f.message}</p>
    </div>` : ""}

    <p style="margin:24px 0 0;text-align:center">
      <a href="mailto:${f.email}" style="display:inline-block;padding:10px 28px;background:#6d28d9;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:6px">Reply to ${f.name.split(" ")[0]}</a>
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:16px 32px;background:#fafafa;border-top:1px solid #e4e4e7">
    <p style="margin:0;font-size:11px;color:#a1a1aa;text-align:center">This is an internal notification from your website contact form.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildAutoReplyHtml(name: string) {
  const firstName = name.split(" ")[0];
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">

  <!-- Header -->
  <tr><td style="background:#1a1a1a;padding:28px 32px;text-align:center">
    <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px">UMAR MALIK</p>
    <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa;letter-spacing:0.5px">SOFTWARE ENGINEER &amp; DESIGNER</p>
  </td></tr>

  <!-- Accent bar -->
  <tr><td style="height:3px;background:linear-gradient(90deg,#6d28d9,#5b21b6)"></td></tr>

  <!-- Body -->
  <tr><td style="padding:32px">
    <p style="margin:0 0 16px;font-size:22px;font-weight:600;color:#1a1a1a">Hey ${firstName} 👋</p>
    <p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.7">
      Thanks for reaching out! I&rsquo;ve received your message and I&rsquo;ll get back to you within <strong style="color:#1a1a1a">24 hours</strong>.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#3f3f46;line-height:1.7">
      In the meantime, feel free to check out my recent work or book a quick call if you&rsquo;d like to chat sooner.
    </p>

    <!-- CTA buttons -->
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td align="center" style="padding-bottom:12px">
        <a href="${SITE}/portfolio" style="display:inline-block;padding:12px 32px;background:#6d28d9;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:6px">View My Work</a>
      </td>
    </tr><tr>
      <td align="center">
        <a href="https://calendly.com/umarmalik-cs711/30min" style="display:inline-block;padding:12px 32px;background:#ffffff;color:#6d28d9;font-size:14px;font-weight:600;text-decoration:none;border-radius:6px;border:2px solid #6d28d9">Book a Call</a>
      </td>
    </tr></table>
  </td></tr>

  <!-- Divider -->
  <tr><td style="padding:0 32px"><div style="height:1px;background:#e4e4e7"></div></td></tr>

  <!-- Social links -->
  <tr><td style="padding:24px 32px;text-align:center">
    <p style="margin:0 0 12px;font-size:12px;color:#a1a1aa;text-transform:uppercase;letter-spacing:0.5px">Connect with me</p>
    <p style="margin:0;font-size:14px">
      <a href="https://www.linkedin.com/in/umarmalik-dev" style="color:#6d28d9;text-decoration:none;margin:0 8px">LinkedIn</a>
      &middot;
      <a href="https://github.com/MuhammadUmarMalik" style="color:#6d28d9;text-decoration:none;margin:0 8px">GitHub</a>
      &middot;
      <a href="https://www.instagram.com/umarmalik_dev/" style="color:#6d28d9;text-decoration:none;margin:0 8px">Instagram</a>
      &middot;
      <a href="https://linktr.ee/umarmalik.dev" style="color:#6d28d9;text-decoration:none;margin:0 8px">Linktree</a>
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:16px 32px;background:#1a1a1a;text-align:center">
    <p style="margin:0 0 4px;font-size:12px;color:#a1a1aa">&copy; ${new Date().getFullYear()} Muhammad Umar Malik</p>
    <p style="margin:0;font-size:11px"><a href="${SITE}" style="color:#6d28d9;text-decoration:none">umarmalik-dev.com</a></p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendContactEmails(fields: ContactFields) {
  await Promise.all([
    transporter.sendMail({
      from: FROM,
      to: "support@umarmalik-dev.com",
      subject: `New lead: ${fields.name} — ${fields.projectType || "General"}`,
      html: buildOwnerHtml(fields),
    }),
    transporter.sendMail({
      from: FROM,
      replyTo: "support@umarmalik-dev.com",
      to: fields.email,
      subject: "Thanks for reaching out — Umar Malik",
      html: buildAutoReplyHtml(fields.name),
    }),
  ]);
}
