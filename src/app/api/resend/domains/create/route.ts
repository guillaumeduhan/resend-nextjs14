import { resend } from '@/app/lib/resend';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  name: string;
  region?: 'us-east-1' | 'eu-west-1' | 'sa-east-1';
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, region }: Props = body;

  if (!name) {
    return NextResponse.json({
      status: 422,
      message: "Unprocessable entity"
    })
  }
  
  try {
    const response = await resend.domains.create({ name, region });

    console.log(response)

    return NextResponse.json({ status: 200, response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}