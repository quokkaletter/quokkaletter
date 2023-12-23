import { firebaseApp } from 'utils/firebaseApp';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = await req.json();
  const userSnapshot = await firebaseApp.collection('users').doc(userId).get();
  const user = userSnapshot.data();
  if (user === undefined) {
    throw new Error(`Cannot find user. userId was <<${userId}>>`);
  }

  if (!user.nickname) {
    return NextResponse.json({
      message: `this user: ${userId} does not have nickname`,
      redirect: '/join',
    });
  }

  return NextResponse.json({
    message: 'success',
    redirect: `/dashboard/${userId}`,
  });
}
