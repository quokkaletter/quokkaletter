import { NextResponse } from 'next/server';
import { firebaseApp } from 'utils/firebaseApp';

/**
 * @swagger
 * /api/nickname:
 *   post:
 *     summary: "유저 닉네임 등록"
 *     description: "유저의 닉네임을 등록합니다."
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               nickname:
 *                 type: string
 *     responses:
 *       200:
 *         description: "닉네임 등록 성공"
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
export async function POST(req: Request) {
  const { userId, nickname } = await req.json();
  await firebaseApp.collection('users').doc(userId).update({
    nickname,
  });

  return NextResponse.json(
    { nickname },
    { status: 201, statusText: 'success' },
  );
}
