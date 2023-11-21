import { resend } from '@/app/lib/resend';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await resend.apiKeys.list();

    return NextResponse.json({ status: 200, response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}