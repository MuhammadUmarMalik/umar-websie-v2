import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, businessType, problem, budget, referral } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // TODO: wire up Resend — `npm install resend` then:
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "website@yourdomain.com",
    //   to: "umarmalik.cs711@gmail.com",
    //   subject: `New enquiry from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nBusiness: ${businessType}\nBudget: ${budget}\nSource: ${referral}\n\nMessage:\n${problem}`,
    // });

    console.log("Contact form submission:", { name, email, businessType, problem, budget, referral });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
