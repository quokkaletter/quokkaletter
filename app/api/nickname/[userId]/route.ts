import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

/**
 * @swagger
 * /api/nickname/{userId}:
 *   get:
 *     summary: "유저 닉네임 조회"
 *     description: "유저의 닉네임 정보를 조회합니다."
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "닉네임 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nickname:
 *                   type: string
 *       400:
 *         description: "클라이언트 측이 잘못된 요청을 보냈습니다."
 *       500:
 *         description: "서버에서 내부 오류가 발생했습니다."
 */
export async function GET(
  _: unknown,
  { params }: { params: { userId: string } },
) {
  const userSnapshot = await firebaseApp
    .collection('users')
    .doc(params.userId)
    .get();
  const user = userSnapshot.data();
  if (user === undefined) {
    throw new Error(`Cannot find user. userId was <<${params.userId}>>`);
  }
  // TODO: nickname이 없을 때 처리 추가
  const nickname = user.nickname;

  return NextResponse.json(
    { nickname },
    { status: 200, statusText: 'success' },
  );
}
