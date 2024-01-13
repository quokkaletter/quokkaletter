'use client';

import { Button } from 'components/ui/button';
import { useModal } from 'hooks/useModal';
import { ViewerLetterModal } from 'components/LetterViewerModal';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export const LetterViewerButton = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { openModal, closeModal, isModalVisible } = useModal();
  const pathname = usePathname();
  const recipientId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)[1];

  /**
   * @description
   * 쿼카레터는 자신의 것만 볼 수 있습니다.
   */
  if (userId !== recipientId) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => openModal()}
        className="bg-[#D9D9D9] text-primary py-2 px-4 mt-6"
      >
        쿼카레터 보러가기
      </Button>
      <ViewerLetterModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />
    </>
  );
};
