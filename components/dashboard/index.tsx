'use client';
import DashboardGrass from 'public/images/dashboard-grass.png';
import DashboardTree from 'public/images/dashboard-tree.png';
import { useAllGetLetterQuery } from 'hooks/useAllGetLetterQuery';
import { usePathname } from 'next/navigation';
import { DashboardSwiperWrapper } from './dashboardswiper';

export const Dashboard = () => {
  const pathname = usePathname();
  const userId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)[1];
  const { letters } = useAllGetLetterQuery({ userId });

  const chunkSize = 6;
  const groupedLetters = Array.from(
    { length: Math.ceil(letters?.data?.length / chunkSize) },
    (_, i) => letters?.data?.slice(i * chunkSize, i * chunkSize + chunkSize),
  );

  return (
    <div>
      <img
        src={DashboardTree.src}
        alt="대쉬보드 배경"
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
        alt="대쉬보드 배경"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '350px',
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
      </div>
    </div>
  );
};
