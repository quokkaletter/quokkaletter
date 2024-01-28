'use client';

import DashboardGrass from 'public/images/dashboard-grass.png';
import DashboardTree from 'public/images/dashboard-tree.png';
import DashboardQuokka from 'public/images/dashboard-quokka.png';
import { useAllGetLetterQuery } from 'hooks/useAllGetLetterQuery';
import { usePathname } from 'next/navigation';
import { DashboardSwiperWrapper } from 'components/dashboard/dashboardswiper';
import { LoadingIndicator } from '@components/common/loading';
import { useModal } from 'hooks/useModal';
import { ViewerLetterModal } from '@components/LetterViewerModal';
import { useSession } from 'next-auth/react';

export const Dashboard = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const myId = session?.user?.id;
  const userId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)[1];
  const { letters } = useAllGetLetterQuery({ userId });
  const { openModal, closeModal, isModalVisible } = useModal();

  const chunkSize = 6;
  const groupedLetters = Array.from(
    { length: Math.ceil(letters?.data?.length / chunkSize) },
    (_, i) => letters?.data?.slice(i * chunkSize, i * chunkSize + chunkSize),
  );

  const isMyDashboard = myId === userId;

  return (
    <div>
      <img
        src={DashboardTree.src}
        alt="Dashboard Tree"
        style={{
          zIndex: 1,
          position: 'absolute',
          width: '500px',
          height: '410px',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <img
        src={DashboardGrass.src}
        alt="Dashboard Grass"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '350px',
        }}
      />
      <img
        src={DashboardQuokka.src}
        alt="Dashboard Quokka"
        style={{
          zIndex: 1,
          position: 'absolute',
          width: '6rem',
          aspectRatio: '275/485',
          bottom: '100px',
          left: '80%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        style={{
          zIndex: 1,
          position: 'absolute',
          bottom: '230px',
          height: '300px',
          width: '200px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '5px',
        }}
      >
        {letters.isLoading ? (
          <LoadingIndicator />
        ) : (
          <DashboardSwiperWrapper>
            {groupedLetters?.map((letters, index) => (
              <div
                key={index}
                className="absolute grid grid-cols-2 grid-rows-3 gap-4 h-[240px]"
              >
                {letters?.map(({ anonymousNickname }, index) => {
                  return (
                    <div
                      key={index + anonymousNickname}
                      className={`flex flex-col justify-center items-center text-center ${
                        isMyDashboard ? 'cursor-pointer' : 'cursor-default'
                      }`}
                      onClick={() => {
                        isMyDashboard && openModal();
                      }}
                    >
                      <span className="text-white">{anonymousNickname}</span>
                      <img
                        src={`/images/tree_icon_v${
                          Math.floor(Math.random() * 5) + 1
                        }.png`}
                        className="w-12"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </DashboardSwiperWrapper>
        )}
        <ViewerLetterModal
          closeModal={closeModal}
          isModalVisible={isModalVisible}
        />
      </div>
    </div>
  );
};
