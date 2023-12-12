import { Modal } from 'components/modal/';

import { useState, ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';

type WriteLetterModalProps = {
  closeModal: () => void;
  isModalVisible: boolean;
};

export const WriteLetterModal = ({
  closeModal,
  isModalVisible,
}: WriteLetterModalProps) => {
  const [letter, setLetter] = useState('');

  const handleLetterChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(e.target.value);
  };

  if (!isModalVisible) return null;
  return (
    <>
      <Modal onClose={closeModal} visible={isModalVisible}>
        <div className="modalPosition bg-white p-8 rounded-md w-[90%] max-w-[480px] max-h-[500px] h-[60%]">
          <h1>편지를 쓰는 모달입니다.</h1>
          <Textarea
            className="w-full h-full"
            onChange={handleLetterChange}
            value={letter}
            placeholder="평소에 {{userName}}에게 못다했던 말이 있었나요? 
혹은 궁금했거나 하고 싶은 이야기가 있다면 편하게 남겨보아요!"
          />
        </div>
      </Modal>
    </>
  );
};
