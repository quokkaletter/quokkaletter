import { WriteLetterButton } from 'components/WriteLetterButton';
import { Header } from 'components/header';
import DashboardBackground from 'public/images/dashboard-background.png';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from 'lib/auth';
import { LetterViewerButton } from 'components/LetterViewerButton';
import { CountdownTimer } from 'components/duration';

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/');

  return (
    <div className="overflow-hidden h-full">
      <Header />
      <div className="flex justify-center flex-col items-center h-[calc(100vh-48px)]">
        <img
          src={DashboardBackground.src}
          alt="대쉬보드 배경"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* TODO: 임의로 Date */}
        <CountdownTimer targetDate={new Date('2024-01-10')} />
        <WriteLetterButton />
        <LetterViewerButton />
      </div>
    </div>
  );
}
