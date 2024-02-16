import { NextResponse } from 'next/server';
import * as R from 'ramda';
import { Letter } from 'schema/Letters';
import { firebaseApp } from 'utils/firebaseApp';

export async function GET() {
  const letterSnapshot = await firebaseApp.collection('letters').get();

  // 가장 많은 레터를 받은 유저
  const letters = letterSnapshot.docs.map((doc) => doc.data());
  const byRecipientId = R.groupBy((letter: Letter) => letter.recipientId);
  const usersGroupedByRecipientId = byRecipientId(letters as Letter[]);
  // const recievedLetterCountByUserId = usersGroupedByRecipientId;
  console.log(usersGroupedByRecipientId);
  // 가장 많은 (친구들에게) 레터를 받은 유저

  return NextResponse.json({ status: 200, statusText: 'success' });
}
