import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

export async function GET(
  _: unknown,
  { params }: { params: { userId: string } },
) {
  const recipientSnapshot = await firebaseApp
    .collection('users')
    .doc(params.userId)
    .get();
  const recipient = recipientSnapshot.data();
  if (recipient === undefined) {
    throw new Error(`Cannot find user. userId was <<${params.userId}>>`);
  }
  const lettersByRecipientIdSnapshot = await firebaseApp
    .collection('letters')
    .where('recipientId', '==', params.userId)
    .get();
  const lettersByRecipientId = lettersByRecipientIdSnapshot.docs.map((doc) =>
    doc.data(),
  );

  return NextResponse.json(
    {
      letters: lettersByRecipientId,
    },
    { status: 200, statusText: 'success' },
  );
}
