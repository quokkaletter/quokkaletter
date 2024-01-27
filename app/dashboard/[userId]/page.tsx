import { WriteLetterButton } from 'components/WriteLetterButton';
import { Header } from 'components/header';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from 'lib/auth';
import { LetterViewerButton } from 'components/LetterViewerButton';
import { CountdownTimer } from 'components/duration';
import { CloudAnimation } from 'components/cloud';
import { Dashboard } from 'components/dashboard';

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/');

  return (
    <div className="overflow-hidden h-full relative">
      <Header />

      <Dashboard />
      <CloudAnimation />

      <div className="h-[calc(100vh-48px)] p-2 bg-[#A5D8FF] text-right">
        <CountdownTimer targetDate={new Date('2024-02-10')} />
        <WriteLetterButton />
        <LetterViewerButton />
      </div>
    </div>
  );
}
