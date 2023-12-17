import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await request.json();

  return NextResponse.json({
    message: 'success',
    redirect: `/dashboard/${userId}`,
  });
}
