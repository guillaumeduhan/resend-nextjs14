import { resend } from '@/app/lib/resend';
import EmailTemplate from '@/components/email-template';
import { NextRequest, NextResponse } from 'next/server';

type Tag = {
  name: string;
  value: string;
}

interface Props {
  from: string;
  to: string | string[];
  bcc?: string | string[];
  cc?: string | string[];
  html?: string;
  reply_to?: string;
  subject: string;
  content: string;
  headers?: any;
  attachments?: Buffer | string;
  tags?: Tag[];
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  let { from, to, bcc, cc, html, reply_to, subject, content, headers, attachments, tags }: Props = body
    
  try {
    await resend.emails.send({
      from,
      to,
      subject,
      react: EmailTemplate({ content }),
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
