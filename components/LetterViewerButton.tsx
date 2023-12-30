'use client';

import { Button } from 'components/ui/button';
import { useModal } from 'hooks/useModal';
import { ViewerLetterModal } from 'components/LetterViewerModal';

export const LetterViewerButton = () => {
  const { openModal, closeModal, isModalVisible } = useModal();

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
