import { firebaseApp } from 'utils/firebaseApp';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { userId } = await req.json();
  const userDoc = await firebaseApp.collection('users').doc(userId).get();
  const user = userDoc.data();
  if (!user.nickname) {
    console.log(
      `this user does not have nickname. redirect to ${process.env.NEXTAUTH_URL}/join`,
    );
    return new NextResponse('/join', { status: 200 });
  }
  return new NextResponse(`/dashboard/${userId}`, { status: 200 });
};
