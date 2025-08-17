import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { summary, email } = await request.json();

    if (!summary || !email) {
      return NextResponse.json({ error: 'Summary and email are required.' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'no-reply@meetnotesummarizer.app',
      to: email,
      subject: 'Your Meeting Summary',
      html: `<pre style="font-family:inherit">${summary}</pre>`,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    let message = 'Internal server error';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}