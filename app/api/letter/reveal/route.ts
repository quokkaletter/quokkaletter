import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

export async function POST() {
  const lettersSnapshot = await firebaseApp.collection('letters').get();
  const lettersDocs = lettersSnapshot.docs;
  const letterIds = lettersDocs.map((doc) => doc.id);
  letterIds.forEach((letterId) => {
    const docRef = firebaseApp.collection('letters').doc(letterId);
    docRef.update({
      isVisible: true,
      updatedAt: new Date(),
    });
  });
  console.log(`${letterIds.length} letters are revealed! 🎉`);

  return NextResponse.json('reveal all letters success', {
    status: 200,
    statusText: 'success',
  });
}
