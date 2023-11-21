import { resend } from '@/app/lib/resend';
import EmailTemplate from '@/components/codewithg';
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

  if (!from || !to || !subject || !content) {
    return NextResponse.json({
      status: 422,
      message: "Unprocessable entity"
    })
  }

  if (!Array.isArray(to)) to = [to];
  if (bcc && !Array.isArray(bcc)) bcc = [bcc];
  if (cc && !Array.isArray(cc)) cc = [cc];
    
  try {
    const emailPromises = [...new Set(to)]
      .map((recipientEmail: string) => {
        return resend.emails.send({
          from,
          to: recipientEmail,
          bcc,
          cc,
          reply_to,
          subject,
          react: EmailTemplate({ content }),
        });
      });

    const responses = await Promise.all(emailPromises);

    return NextResponse.json({ status: 200, responses });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
