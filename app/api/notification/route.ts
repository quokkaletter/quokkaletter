import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

export async function POST() {
  const userSnapshot = await firebaseApp.collection('users').get();
  const userIds: string[] = [];
  userSnapshot.forEach((user) => userIds.push(user.id));

  for (const userId of userIds) {
    const operatedAt = new Date();
    const treeIconNumber = Math.floor(Math.random() * 5) + 1;

    await firebaseApp.collection('letters').add({
      writerId: 'EEsVlHRQ9uxEvWfXKTGV',
      recipientId: userId,
      contents: `설문조사 링크는 여깁니다 👉 [https://forms.gle/Mk98u24edXU2F9kH7]\n새해 복 많이 받으시고 건강하고 행복한 한 해가 되길 바라요! 🐉\n쿼카레터 일동 드림`,
      anonymousNickname: '운영진2',
      isVisible: false,
      treeIconNumber,
      createdAt: operatedAt,
      updatedAt: operatedAt,
    });
    console.log(`<<${userId}>>에게 운영진 편지가 전달됐어요 ✨`);
  }
  console.log(`총 <<${userIds.length}>>명의 유저들에게 편지가 전달됐어요 🎉`);

  return NextResponse.json({ status: 201, statusText: 'success' });
}
