import { LoginOrJoinButton } from '@components/LoginOrJoinButton';
import QuokkaImage from '@public/images/quokka.svg';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/auth';
import { redirect } from 'next/navigation';

// user id data 연동 이후 제거 예정
const USER_ID = 'my-id';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) return redirect(`/dashboard/${USER_ID}`);

  return (
    <div className="overflow-hidden h-full">
      <div className="flex justify-center  flex-col items-center h-screen bg-green">
        {/* TODO : 로그인 전 쿼카용 이미지로 교체 필요 */}
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
