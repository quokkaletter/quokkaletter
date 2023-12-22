import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

import { Modal } from 'components/modal/';

import { Button } from '@/components/ui/button';
import { useState, ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

type WriteLetterModalProps = {
  closeModal: () => void;
  isModalVisible: boolean;
};

export const WriteLetterModal = ({
  closeModal,
  isModalVisible,
}: WriteLetterModalProps) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const pathname = usePathname();
  const recipientId = pathname.match(/\/dashboard\/([a-zA-Z0-9]+)/)[1];
  const [letter, setLetter] = useState('');

  const handleLetterChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(e.target.value);
  };

  const handleSendLetter = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/letter`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          recipientId,
          contents: letter,
        }),
      },
    );

    if (res.ok) {
      toast.success('편지가 전송되었어요!');
      closeModal();
    } else {
      toast.error('편지 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (!isModalVisible) return null;
  return (
    <>
      <Modal onClose={closeModal} visible={isModalVisible}>
        <div className="flex flex-col modalPosition bg-white p-8 rounded-md w-[90%] max-w-[480px] max-h-[500px] h-[60%]">
          <h1>편지를 쓰는 모달입니다.</h1>
          <Textarea
            className="w-full flex-1 resize-none"
            onChange={handleLetterChange}
            value={letter}
            placeholder="평소에 {{userName}}에게 못다했던 말이 있었나요? 혹은 궁금했거나 하고 싶은 이야기가 있다면 편하게 남겨보아요!"
          />
          <Button
            className={`text-base flex items-center py-2 px-4 mt-4 ${
              letter === ''
                ? 'bg-gray-300 text-gray-500'
                : 'bg-[#588251]/90 text-white'
            } ${letter === '' ? 'cursor-not-allowed' : ''}`}
            onClick={handleSendLetter}
            disabled={letter === ''}
          >
            편지 전송
            <EnvelopeClosedIcon className="ml-2" />
          </Button>
        </div>
      </Modal>
    </>
  );
};
