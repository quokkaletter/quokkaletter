'use client';

import { Lock } from 'lucide-react';
import { useRef } from 'react';
import { useDynamicLineHeight } from 'hooks/useDynamicLineHeight';
import { Modal } from 'components/modal/';
import { Label } from 'components/ui/label';
import { useAllGetLetterQuery } from 'hooks/useAllGetLetterQuery';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { SwiperWrapper } from 'components/common/swiper';
import { Button } from 'components/ui/button';

interface ViewerLetterModalProps {
  closeModal: () => void;
  isModalVisible: boolean;
}

export const ViewerLetterModal: React.FC<ViewerLetterModalProps> = ({
  closeModal,
  isModalVisible,
}) => {
  const { letters } = useAllGetLetterQuery({});

  const letterRef = useRef(null);
  const lineHeight = useDynamicLineHeight({
    ref: letterRef,
    isVisible: isModalVisible,
  });

  if (letters.data?.length === 0)
    return (
      <Modal onClose={closeModal} visible={isModalVisible}>
        <div className=" h-full flex items-center justify-center ">
          <p className="bg-white p-10 rounded">
            <p>
              쿼카레터가 아직 없어요! <br />
              친구에게 링크를 공유해볼까요?
              <span className="text-sm">(메뉴 - 내 링크 공유하기)</span>
            </p>
          </p>
        </div>
      </Modal>
    );

  if (letters.data)
    return (
      <Modal onClose={closeModal} visible={isModalVisible}>
        <SwiperWrapper>
          {letters.data.map((letter, key) => (
            <Letter
              key={key}
              {...letter}
              lineHeight={lineHeight}
              letterRef={letterRef}
              closeModal={closeModal}
            />
          ))}
        </SwiperWrapper>
      </Modal>
    );
};

type LetterProps = {
  contents: string;
  anonymousNickname: string;
  isVisible: boolean;
  key: number;
  lineHeight: string;
  letterRef: React.RefObject<HTMLTextAreaElement>;
  closeModal: () => void;
};

export const Letter: React.FC<LetterProps> = ({
  contents,
  anonymousNickname,
  isVisible,
  letterRef,
  lineHeight,
  closeModal,
}) => {
  const buttonDynamicStyles = 'bg-[#588251]/90 text-white';

  if (isVisible) {
    return (
      <div className="modalPosition bg-white w-[90%] max-w-[450px] min-h-[60%] max-h-[700px] rounded-lg">
        <div className="flex justify-center items-center gap-2 p-2 relative">
          <Label htmlFor="nickname" className="border-none border-b text-xl">
            From:
          </Label>
          <input
            id="nickname"
            className="text-xl focus:outline-none p-2 w-full pointer-events-none"
            value={anonymousNickname}
            readOnly
          />
        </div>
        <textarea
          ref={letterRef}
          maxLength={300}
          style={{
            lineHeight: lineHeight,
          }}
          id="letter"
          value={contents}
          className="letter-bg placeholder:letter-bg text-xl resize-none w-full py-2 px-5 focus:outline-none pointer-events-none"
          readOnly
        />
        <Button
          onClick={closeModal}
          className={`w-full text-xl flex items-center justify-center ${buttonDynamicStyles}`}
        >
          확인
          <EnvelopeClosedIcon className="ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-md inset-0 bg-black bg-opacity-50 justify-center items-center flex flex-col gap-2 text-white">
      <Lock color="white" size={48} />
      {/* TODO:여기는 날짜 떨어지는 효과 주면 될 것 같음1 */}
      <p>날짜가 얼마 안남았어요!</p>
    </div>
  );
};
