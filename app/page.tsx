import { LoginOrJoinButton } from 'components/LoginOrJoinButton';
import QuokkaImage from 'public/images/quokka.svg';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/auth';
import { redirect } from 'next/navigation';

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
      <div className="flex justify-center  flex-col items-center h-screen bg-green">
        <Image
          src={QuokkaImage.src}
          alt="quokka logo"
          width={160}
          height={160}
        />
        <LoginOrJoinButton />
      </div>
    </div>
  );
}
