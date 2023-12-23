import { firebaseApp } from 'utils/firebaseApp';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, recipientId, contents, anonymousNickname } = await req.json();

  const userSnapshot = await firebaseApp.collection('users').doc(userId).get();
  const user = userSnapshot.data();
  if (user === undefined) {
    throw new Error(`Cannot find user. userId was <<${userId}>>`);
  }

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
