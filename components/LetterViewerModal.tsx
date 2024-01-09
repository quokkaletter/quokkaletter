'use client';

import { Lock } from 'lucide-react';

import { Modal } from 'components/modal/';

import { Label } from 'components/ui/label';
import { useAllGetLetterQuery } from 'hooks/useAllGetLetterQuery';
import { SwiperWrapper } from 'components/common/swiper';

interface ViewerLetterModalProps {
  closeModal: () => void;
  isModalVisible: boolean;
}

export const ViewerLetterModal: React.FC<ViewerLetterModalProps> = ({
  closeModal,
  isModalVisible,
}) => {
  const { letters } = useAllGetLetterQuery();

  if (letters.data)
    return (
      <Modal onClose={closeModal} visible={isModalVisible}>
        <div className="modalPosition bg-white p-8 rounded-md w-[90%] max-w-[480px] max-h-[500px] h-[60%]">
          <SwiperWrapper>
            {letters.data.map((letter, key) => (
              <Letter key={key} {...letter} />
            ))}
          </SwiperWrapper>
        </div>
      </Modal>
    );
};

type LetterProps = {
  contents: string;
  anonymousNickname: string;
  isVisible: boolean;
  key: number;
};

export const Letter: React.FC<LetterProps> = ({
  contents,
  anonymousNickname,
  isVisible,
  key,
}) => {
  if (isVisible) {
    return (
      <div key={key} className="flex flex-col items-center justify-center">
        <Label className="text-2xl absolute top-0 left-10">
          {anonymousNickname}
        </Label>
        <Label>{contents}</Label>
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
