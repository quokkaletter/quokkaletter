import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

export async function GET(
  _: unknown,
  { params }: { params: { userId: string } },
) {
  const userSnapshot = await firebaseApp
    .collection('users')
    .doc(params.userId)
    .get();
  const user = userSnapshot.data();
  // TODO: nickname이 없을 때 처리 추가
  const nickname = user.nickname;

  return NextResponse.json(
    { nickname },
    { status: 200, statusText: 'success' },
  );
}
