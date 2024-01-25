import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

import { Modal } from 'components/modal/';

import { Button } from 'components/ui/button';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Label } from 'components/ui/label';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useGetNicknameQuery } from '@hooks/useGetNicknameQuery';
import { useAllGetLetterQuery } from '@hooks/useAllGetLetterQuery';

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
  const [nickName, setNickName] = useState('');
  const letterRef = useRef(null);
  const [lineHeight, setLineHeight] = useState('64px'); // 초기 lineHeight 값
  const { nickname } = useGetNicknameQuery({
    userId: recipientId,
  });
  const recipientNickname = nickname.data;
  const { letters } = useAllGetLetterQuery({ userId: recipientId });

  const handleLetterChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(e.target.value);
  };

  const handleNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleSendLetter = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUOKKA_LETTER_URL}/api/letter`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          recipientId,
          contents: letter,
          anonymousNickname: nickName,
        }),
      },
    );

    if (res.ok) {
      toast.success('편지가 전송되었어요!');
      setLetter('');
      setNickName('');
      closeModal();
      letters.refetch();
    } else {
      toast.error('편지 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const isButtonDisabled = letter === '' || nickName === '';
  const buttonDynamicStyles = isButtonDisabled
    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
    : 'bg-[#588251]/90 text-white';

  useEffect(() => {
    const calculateLineHeight = () => {
      if (letterRef.current) {
        const width = letterRef.current.clientWidth;
        const height = width * (708 / 598);
        const newLineHeight = height / 11;

        setLineHeight(`${newLineHeight}px`);
      }
    };

    if (isModalVisible) {
      calculateLineHeight();
    }
  }, [isModalVisible]);

  if (!isModalVisible) return null;
  return (
    <>
      <Modal onClose={closeModal} visible={isModalVisible}>
        <div className="modalPosition bg-white w-[90%] max-w-[450px] min-h-[60%] max-h-[700px] rounded-lg">
          <div className="flex justify-center items-center gap-2 p-2 relative">
            <Label htmlFor="nickname" className="border-none border-b text-xl">
              To:
            </Label>
            <input
              id="nickname"
              className="text-xl focus:outline-none p-2 w-full"
              value={nickName}
              onChange={handleNickNameChange}
              placeholder="나의 닉네임을 지정해주세요 :-)"
            />
          </div>
          <textarea
            maxLength={300}
            ref={letterRef}
            style={{
              lineHeight: lineHeight,
            }}
            id="letter"
            onChange={handleLetterChange}
            value={letter}
            className="letter-bg placeholder:letter-bg text-xl resize-none w-full py-2 px-5 focus:outline-none"
            placeholder={`평소에 '${recipientNickname}'에게 못다했던 말이 있었나요? 혹은 궁금했거나 하고 싶은 이야기가 있다면 편하게 남겨보아요!`}
          />
          <Button
            className={`w-full text-xl flex items-center justify-center ${buttonDynamicStyles}`}
            onClick={handleSendLetter}
            disabled={isButtonDisabled}
          >
            편지 전송
            <EnvelopeClosedIcon className="ml-2" />
          </Button>
        </div>

        {/* <div className="flex flex-col modalPosition bg-white p-8 rounded-md w-[90%] max-w-[480px] max-h-[500px] h-[60%]">
          <Textarea
            id="letter"
            className="w-full flex-1 resize-none"
            onChange={handleLetterChange}
            value={letter}
            placeholder="평소에 {{userName}}에게 못다했던 말이 있었나요? 혹은 궁금했거나 하고 싶은 이야기가 있다면 편하게 남겨보아요!"
          />
          <Label htmlFor="nickname" className="w-60 mt-2 border-none border-b">
            나의 닉네임
          </Label>
          <Input
            id="nickname"
            className="w-60"
            value={nickName}
            onChange={handleNickNameChange}
            placeholder="나의 닉네임을 지정해주세요 :-)"
          />
          <Button
            className={`w-full text-base flex items-center py-2 px-4 mt-4 ${
              letter === '' || nickName === ''
                ? 'bg-gray-300 text-gray-500'
                : 'bg-[#588251]/90 text-white'
            } ${letter === '' ? 'cursor-not-allowed' : ''}`}
            onClick={handleSendLetter}
            disabled={letter === ''}
          >
            편지 전송
            <EnvelopeClosedIcon className="ml-2" />
          </Button> */}
      </Modal>
    </>
  );
};
