'use client';

import DashboardGrass from 'public/images/dashboard-grass.png';
import DashboardTree from 'public/images/dashboard-tree.png';
import DashboardQuokka from 'public/images/dashboard-quokka.png';
import { useAllGetLetterQuery } from 'hooks/useAllGetLetterQuery';
import { usePathname } from 'next/navigation';
import { DashboardSwiperWrapper } from 'components/dashboard/dashboardswiper';
import { useGetNicknameQuery } from 'hooks/useGetNicknameQuery';
import { LoadingIndicator } from '@components/common/loading';

export const Dashboard = () => {
  const pathname = usePathname();
  const userId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)[1];
  const { letters } = useAllGetLetterQuery({ userId });
  const {
    nickname: { data: nickname },
  } = useGetNicknameQuery({
    userId,
  });

  const chunkSize = 6;
  const groupedLetters = Array.from(
    { length: Math.ceil(letters?.data?.length / chunkSize) },
    (_, i) => letters?.data?.slice(i * chunkSize, i * chunkSize + chunkSize),
  );

  return (
    <div>
      <div
        className="absolute"
        style={{
          bottom: 'calc(100px + 405px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        {nickname}
      </div>
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
                      className="flex flex-col justify-center items-center text-center"
                    >
                      <span className="text-white">{anonymousNickname}</span>
                      <img
                        src={`/images/mandarin_v${
                          Math.floor(Math.random() * 2) + 1
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
      </div>
    </div>
  );
};
