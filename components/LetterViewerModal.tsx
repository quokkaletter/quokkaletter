'use client';

import { register } from 'swiper/element/bundle';
import Swiper, { SwiperOptions } from 'swiper';
import { useRef } from 'react';

import { Modal } from 'components/modal/';

import { Label } from '@/components/ui/label';
import { useAllGetLetterQuery } from 'hooks/useAllGetLetterQuery';
import { SwiperWrapper } from './common/swiper';

interface ViewerLetterModalProps {
  closeModal: () => void;
  isModalVisible: boolean;
}

export const ViewerLetterModal: React.FC<ViewerLetterModalProps> = ({
  closeModal,
  isModalVisible,
}) => {
  const carouselRef = useRef<SwiperRef>(null);
  const { letters } = useAllGetLetterQuery();

  if (letters.data)
    return (
      <Modal onClose={closeModal} visible={isModalVisible}>
        <div className="modalPosition bg-white p-8 rounded-md w-[90%] max-w-[480px] max-h-[500px] h-[60%]">
          <SwiperWrapper>
            {letters.data.map(
              ({ contents, anonymousNickname, isVisible }, key) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center"
                >
                  <Label className="text-2xl absolute top-0 left-10">
                    {anonymousNickname}
                  </Label>
                  <Label>{contents}</Label>
                </div>
              ),
            )}
          </SwiperWrapper>
        </div>
      </Modal>
    );
};
