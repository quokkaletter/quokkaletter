import { WriteLetterButton } from 'components/WriteLetterButton';
import { Header } from 'components/header';
import DashboardGrass from 'public/images/dashboard-grass.png';
import DashboardTree from 'public/images/dashboard-tree.png';

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
      <img
        src={DashboardTree.src}
        alt="대쉬보드 배경"
        style={{
          position: 'absolute',
          width: '500px',
          height: '420px',
          bottom: '60px',
        }}
      />
      <img
        src={DashboardGrass.src}
        alt="대쉬보드 배경"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      />
      <div className="flex flex-col h-[calc(100vh-48px)] p-2">
        <CountdownTimer targetDate={new Date('2024-02-10')} />
        <WriteLetterButton />
        <LetterViewerButton />
      </div>
    </div>
  );
}
