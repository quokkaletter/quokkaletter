'use client';

import { Button } from 'components/ui/button';
import { useModal } from 'hooks/useModal';
import { Pen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { WriteLetterModal } from './WriteLetterModal';

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
        className="mt-3 inline-flex items-center gap-1"
        onClick={() => openModal()}
        variant="button"
      >
        쿼카레터 쓰러가기
        <Pen style={{ width: '15px', height: '15px' }} />
      </Button>
      <WriteLetterModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />
    </>
  );
};
