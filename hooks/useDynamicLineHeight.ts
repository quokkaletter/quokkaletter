import { useEffect, useState } from 'react';

type useDynamicLineHeightProps = {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  ratio?: number;
  lines?: number;
};

export const useDynamicLineHeight = ({
  ref,
  isVisible,
  ratio = 708 / 598,
  lines = 11,
}: useDynamicLineHeightProps) => {
  const [lineHeight, setLineHeight] = useState('64px');

  useEffect(() => {
    const calculateLineHeight = () => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        const height = width * ratio;
        const newLineHeight = height / lines;

        setLineHeight(`${newLineHeight}px`);
      }
    };

    if (isVisible) {
      calculateLineHeight();
    }
  }, [isVisible]);

  return lineHeight;
};
