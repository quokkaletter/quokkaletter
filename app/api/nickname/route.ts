import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { nickname } = await request.json();

  console.log('여기는 서버', nickname);

  return NextResponse.json({ message: 'success' });
}
