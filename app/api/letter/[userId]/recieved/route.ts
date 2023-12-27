import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

export async function GET(
  _: unknown,
  { params }: { params: { userId: string } },
) {
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
