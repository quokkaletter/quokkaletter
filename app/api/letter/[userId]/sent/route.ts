import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

export async function GET(
  _: unknown,
  { params }: { params: { userId: string } },
) {
  const lettersByWriterIdSnapshot = await firebaseApp
    .collection('letters')
    .where('writerId', '==', params.userId)
    .get();
  const lettersByWriterId = lettersByWriterIdSnapshot.docs.map((doc) =>
    doc.data(),
  );

  return NextResponse.json(
    {
      letters: lettersByWriterId,
    },
    { status: 200, statusText: 'success' },
  );
}
