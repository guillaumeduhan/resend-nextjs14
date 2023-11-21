import { resend } from '@/app/lib/resend';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  name: string;
  permission?: "full_access" | "sending_access";
  domainId?: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, permission, domainId }: Props = body;

  if (!name) {
    return NextResponse.json({
      status: 422,
      message: "Unprocessable entity"
    })
  }
  
  try {
    const response = await resend.apiKeys.create({ name, permission, domainId });

    return NextResponse.json({ status: 200, response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}