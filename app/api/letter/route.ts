import { firebaseApp } from 'utils/firebaseApp';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, recipientId, contents, anonymousNickname } = await req.json();
  await firebaseApp.collection('letters').add({
    writerId: userId,
    recipientId,
    contents,
    anonymousNickname,
  });

  return NextResponse.json(
    {
      writerId: userId,
      recipientId,
      contents,
      anonymousNickname,
    },
    { status: 201, statusText: 'success' },
  );
}
