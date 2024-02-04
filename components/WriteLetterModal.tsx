import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { Modal } from 'components/modal/';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { useAllGetLetterQuery } from 'hooks/useAllGetLetterQuery';
import { useDynamicLineHeight } from 'hooks/useDynamicLineHeight';
import { useGetNicknameQuery } from 'hooks/useGetNicknameQuery';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useRef, useState } from 'react';
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
  const [nickName, setNickName] = useState('');
  const { nickname } = useGetNicknameQuery({
    userId: recipientId,
  });
  const recipientNickname = nickname.data;
  const { letters } = useAllGetLetterQuery({ userId: recipientId });
  const letterRef = useRef(null);
  const lineHeight = useDynamicLineHeight({
    ref: letterRef,
    isVisible: isModalVisible,
  });

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

  if (!isModalVisible) return null;
  return (
    <>
      <Modal onClose={closeModal} visible={isModalVisible}>
        <section className="w-full h-full">
          <div className="w-[90%] max-w-[450px] min-h-[30%] max-h-[700px] modalPosition">
            {/* X Button */}
            <div className="w-full flex justify-end px-2 py-1">
              <div
                onClick={closeModal}
                className="w-6 h-6 bg-white rounded-md border-solid border-black border-1 flex justify-center items-center mb-2 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </div>
            </div>

            {/* Letters */}
            <div className="bg-white mb-2 rounded-lg">
              <div className="flex justify-center items-center gap-2 p-2 relative">
                <Label
                  htmlFor="nickname"
                  className="border-none border-b text-xl"
                >
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
                placeholder={`평소에 '${recipientNickname}'에게 궁금했거나 하고 싶은 이야기가 있다면 편하게 남겨보아요!`}
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
          </div>
        </section>
      </Modal>
    </>
  );
};
