import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

export async function GET() {
  const userCountSnapshot = await firebaseApp
    .collection('letters')
    .count()
    .get();
  const letterCount = userCountSnapshot.data().count;

  return NextResponse.json(
    { letterCount },
    { status: 200, statusText: 'success' },
  );
}
