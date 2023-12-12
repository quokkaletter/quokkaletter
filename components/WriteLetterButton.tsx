'use client';

import { Button } from '@/components/ui/button';
import { useModal } from 'hooks/useModal';
import { WriteLetterModal } from './WriteLetterModal';

export const WriteLetterButton = () => {
  const { closeModal, setIsModalVisible, isModalVisible } = useModal();

  return (
    <>
      <Button variant="secondary" onClick={() => setIsModalVisible(true)}>
        쿼카레터 쓰러가기
      </Button>
      <WriteLetterModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />
    </>
  );
};
