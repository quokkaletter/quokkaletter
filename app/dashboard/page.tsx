import { WriteLetterButton } from '@components/WriteLetterButton';
import { Header } from '@components/header';
import QuokkaImage from '@public/images/quokka.svg';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from 'lib/auth';

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/');

  return (
    <div className="overflow-hidden h-full">
      <Header />
      <div className="flex justify-center  flex-col items-center bg-green h-[calc(100vh-48px)]">
        <Image
          src={QuokkaImage.src}
          alt="quokka logo"
          width={160}
          height={160}
        />
        <WriteLetterButton />
      </div>
    </div>
  );
}
