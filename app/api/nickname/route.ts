import { firebaseApp } from 'utils/firebaseApp';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, nickname } = await req.json();
  await firebaseApp.collection('users').doc(userId).update({
    nickname,
  });

  return NextResponse.json({ message: 'success', nickname });
}
