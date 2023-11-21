import { resend } from '@/app/lib/resend';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  emailId: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { emailId }: Props = body;

  if (!emailId) {
    return NextResponse.json({
      status: 422,
      message: "Unprocessable entity"
    })
  }
  
  try {
    const response = await resend.emails.get(emailId);

    return NextResponse.json({ status: 200, response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}