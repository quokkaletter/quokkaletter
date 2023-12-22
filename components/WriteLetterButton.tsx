'use client';

import { Button } from '@/components/ui/button';
import { useModal } from 'hooks/useModal';
import { WriteLetterModal } from './WriteLetterModal';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useGetNicknameQuery } from '@hooks/useGetNicknameQuery';

export const WriteLetterButton = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const pathname = usePathname();
  const recipientId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)[1];
  const { closeModal, setIsModalVisible, isModalVisible } = useModal();
  const { nickname } = useGetNicknameQuery({ userId });

  if (userId === recipientId) {
    return <div style={{ color: 'white' }}>{nickname.data}의 쿼카레터</div>;
  }

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
