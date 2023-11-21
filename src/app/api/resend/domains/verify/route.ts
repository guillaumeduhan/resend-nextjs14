import { resend } from '@/app/lib/resend';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  domainId: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { domainId }: Props = body;

  if (!domainId) {
    return NextResponse.json({
      status: 422,
      message: "Unprocessable entity"
    })
  }
  
  try {
    const response = await resend.domains.verify({ domainId });

    return NextResponse.json({ status: 200, response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}