'use client';

import { LoadingIndicator } from '@components/common/loading';
import { ViewerLetterModal } from '@components/LetterViewerModal';
import { DashboardSwiperWrapper } from 'components/dashboard/dashboardswiper';
import { useAllGetLetterQuery } from 'hooks/useAllGetLetterQuery';
import { useModal } from 'hooks/useModal';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DashboardGrass from 'public/images/dashboard-grass.png';
import DashboardQuokka from 'public/images/dashboard-quokka.png';
import DashboardTree from 'public/images/dashboard-tree.png';

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
  const formatNickname = (nickname: string) =>
    nickname.length > 7 ? `${nickname.substring(0, 7)}...` : nickname;

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
      {letters.isLoading ? (
        <LoadingIndicator />
      ) : (
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
          <DashboardSwiperWrapper>
            {groupedLetters?.map((letters, index) => (
              <div
                key={index}
                className="absolute grid grid-cols-2 grid-rows-3 gap-4 h-[240px]"
              >
                {letters?.map(
                  ({ anonymousNickname, treeIconNumber }, index) => {
                    const displayedNickname = formatNickname(anonymousNickname);

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
                        <span className="text-white">{displayedNickname}</span>
                        <img
                          alt=""
                          src={`/images/tree_icon_v${treeIconNumber}.png`}
                          className="w-12"
                        />
                      </div>
                    );
                  },
                )}
              </div>
            ))}
          </DashboardSwiperWrapper>

          <ViewerLetterModal
            closeModal={closeModal}
            isModalVisible={isModalVisible}
            recipientId={userId}
          />
        </div>
      )}
    </div>
  );
};
