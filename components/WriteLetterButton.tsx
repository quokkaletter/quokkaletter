'use client';

import { Button } from '@/components/ui/button';
import { useModal } from 'hooks/useModal';
import { WriteLetterModal } from './WriteLetterModal';

export const WriteLetterButton = () => {
  const { closeModal, setIsModalVisible, isModalVisible } = useModal();

  return (
    <>
      <Button
        className="bg-[#D9D9D9] text-primary py-2 px-4"
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
