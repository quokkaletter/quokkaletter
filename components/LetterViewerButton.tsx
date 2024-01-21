'use client';

import { Button } from 'components/ui/button';
import { useModal } from 'hooks/useModal';
import { ViewerLetterModal } from 'components/LetterViewerModal';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Mail } from 'lucide-react';

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
        className="mt-3 inline-flex items-center gap-1"
        onClick={() => openModal()}
        variant="button"
        style={{
          boxShadow: '1px 2px 2px 2px var(--yellow)',
        }}
      >
        쿼카레터 보러가기
        <Mail style={{ width: '15px', height: '15px', marginBottom: '1px' }} />
      </Button>
      <ViewerLetterModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />
    </>
  );
};
