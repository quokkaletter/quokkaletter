'use client';

import { formatDuration, intervalToDuration } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';

type CountdownTimerProps = {
  targetDate: Date;
  showLabel?: boolean;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  showLabel = false,
}) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration({ start: now, end: targetDate });
      const formattedDuration = formatDuration(duration, {
        locale: ko,
      });
      setTimeLeft(formattedDuration);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft === '') return null;

  return <div>{showLabel ? `쿼카레터 공개 : ${timeLeft}` : timeLeft}</div>;
};
