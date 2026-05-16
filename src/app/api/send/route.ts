import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Resend API key is missing. Set RESEND_API_KEY in .env.local or your deployment environment.');
      return NextResponse.json({ success: false, error: 'Mail service is not configured.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['pankajkashap26@gmail.com'],
      subject: `Portfolio: Message from ${name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; padding: 40px; background-color: #050505; color: #ffffff; border-radius: 20px;">
          <h2 style="color: #3b82f6; margin-bottom: 24px; font-size: 24px; letter-spacing: -0.02em;">New Connection Request</h2>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 16px;">
            <p style="margin-bottom: 16px;"><strong style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em;">Sender</strong><br/><span style="font-size: 18px;">${name}</span></p>
            <p style="margin-bottom: 0;"><strong style="color: rgba(255,255,255,0.4); text-transform: uppercase; font-size: 10px; letter-spacing: 0.2em;">Message</strong><br/><span style="font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8);">${message}</span></p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.2); text-align: center;">Sent via your Portfolio Dashboard</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}
