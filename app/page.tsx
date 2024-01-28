import { LoginOrJoinButton } from 'components/LoginOrJoinButton';
import { authOptions } from 'lib/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import QuokkaImage from 'public/images/login-quokka.png';

const toRedirect = async (userId: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/redirect`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
    }),
  });

  if (!res.ok) {
    throw new Error('redirect하기 위한 정보를 가져오는데 실패했어요!');
  }

  return res.json();
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    const to = await toRedirect(session.user.id);

    return redirect(to.redirect);
  }

  return (
    <div className="overflow-hidden h-full">
      <div className="flex justify-center items-center h-screen bg-green gap-2">
        <Image src={QuokkaImage.src} alt="" width={150} height={150} />
        <div className="flex flex-col gap-4">
          <div className="text-white">쿼카레터에 오신 걸 환영해요!</div>
          <LoginOrJoinButton />
        </div>
      </div>
    </div>
  );
}
