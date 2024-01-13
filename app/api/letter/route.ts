import { firebaseApp } from 'utils/firebaseApp';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/letter:
 *   post:
 *     summary: "레터 작성"
 *     description: "레터를 생성합니다."
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 default: "T6AJ38Eupck8uhauf3hk"
 *                 description: "작성자의 userId 입니다."
 *               recipientId:
 *                 type: string
 *                 default: "jTjtGoiVhl8KnRK9IYwz"
 *                 description: "수신자의 userId 입니다."
 *               contents:
 *                 type: string
 *                 default: "레터 내용입니다. 테스트"
 *                 description: "레터 내용입니다."
 *               anonymousNickname:
 *                 type: string
 *                 default: "수신자에게보여질닉네임테스트"
 *                 description: "수신자에게 보여질 닉네임입니다. 기존의 유저 닉네임과는 무관합니다."
 *     responses:
 *       201:
 *         description: "레터 생성 성공. 생성된 레터 정보를 반환합니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 writerId:
 *                   type: string
 *                 recipientId:
 *                   type: string
 *                 contents:
 *                   type: string
 *                 anonymousNickname:
 *                   type: string
 *                 isVisible:
 *                   type: boolean
 *                   default: false
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       400:
 *         description: "클라이언트 측이 잘못된 요청을 보냈습니다."
 *       500:
 *         description: "서버에서 내부 오류가 발생했습니다."
 */
export async function POST(req: Request) {
  const { userId, recipientId, contents, anonymousNickname } = await req.json();

  const userSnapshot = await firebaseApp.collection('users').doc(userId).get();
  const user = userSnapshot.data();
  if (user === undefined) {
    throw new Error(`Cannot find user. userId was <<${userId}>>`);
  }

  const operatedAt = new Date();
  const addedLetterRef = await firebaseApp.collection('letters').add({
    writerId: userId,
    recipientId,
    contents,
    anonymousNickname,
    isVisible: false,
    createdAt: operatedAt,
    updatedAt: operatedAt,
  });
  const addedLetterSnapshot = await addedLetterRef.get();
  const addedLetter = addedLetterSnapshot.data();

  return NextResponse.json(addedLetter, { status: 201, statusText: 'success' });
}
