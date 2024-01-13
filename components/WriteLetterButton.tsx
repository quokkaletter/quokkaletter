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
  const { closeModal, isModalVisible, openModal } = useModal();

  /**
   * @description
   * 쿼카레터는 자신에게 쿼카레터를 쓸 수 없습니다.
   */
  if (userId === recipientId) {
    return null;
  }

  return (
    <>
      <Button
        className="bg-[#D9D9D9] text-primary py-2 px-4 mt-6"
        onClick={() => openModal()}
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
