import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

/**
 * @swagger
 * /api/letter/{userId}/recieved:
 *   get:
 *     summary: "내가 받은 레터 조회"
 *     description: "내가 받은 레터를 조회합니다."
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "내가 받은 레터 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 letters:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contents:
 *                         type: string
 *                       recipientId:
 *                         type: string
 *                       isVisible:
 *                         type: boolean
 *                         default: false
 *                       writerId:
 *                         type: string
 *                       anonymousNickname:
 *                         type: string
 *                       treeIconNumber:
 *                         type: number
 *                       createdAt:
 *                         type: object
 *                         properties:
 *                           _seconds:
 *                             type: number
 *                           _nanoseconds:
 *                             type: number
 *                       updatedAt:
 *                         type: object
 *                         properties:
 *                           _seconds:
 *                             type: number
 *                           _nanoseconds:
 *                             type: number
 *       400:
 *         description: "클라이언트 측이 잘못된 요청을 보냈습니다."
 *       500:
 *         description: "서버에서 내부 오류가 발생했습니다."
 */
export async function GET(
  _: unknown,
  { params }: { params: { userId: string } },
) {
  const recipientSnapshot = await firebaseApp
    .collection('users')
    .doc(params.userId)
    .get();
  const recipient = recipientSnapshot.data();
  if (recipient === undefined) {
    throw new Error(`Cannot find user. userId was <<${params.userId}>>`);
  }
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
