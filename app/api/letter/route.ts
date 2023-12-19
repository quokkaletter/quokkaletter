import { firebaseApp } from 'utils/firebaseApp';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, recipientId, contents } = await req.json();
  await firebaseApp.collection('letters').add({
    writerId: userId,
    recipientId,
    contents,
  });

  return NextResponse.json({
    message: 'success',
    writerId: userId,
    recipientId,
    contents,
  });
}
