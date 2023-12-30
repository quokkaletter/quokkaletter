'use client';

import { Button } from 'components/ui/button';
import { useModal } from 'hooks/useModal';
import { WriteLetterModal } from './WriteLetterModal';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export const WriteLetterButton = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const pathname = usePathname();
  const recipientId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)[1];
  const { closeModal, setIsModalVisible, isModalVisible } = useModal();

  if (userId === recipientId) {
    return null;
  }

  return (
    <>
      {/* TODO: 배경 이미지 교체 이후 위치 조정 필요 */}
      <Button
        className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-[#D9D9D9] text-primary py-2 px-4"
        onClick={() => setIsModalVisible(true)}
      >
        쿼카레터 쓰러가기
      </Button>
      <WriteLetterModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />
    </>
  );
};
