'use client';

import { ViewerLetterModal } from 'components/LetterViewerModal';
import { Button } from 'components/ui/button';
import { useModal } from 'hooks/useModal';
import { Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

type LetterViewerButtonProps = {
  userId: string;
};

export const LetterViewerButton: React.FC<LetterViewerButtonProps> = ({
  userId,
}) => {
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
        recipientId={recipientId}
      />
    </>
  );
};
