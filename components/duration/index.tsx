'use client';

import { useState, useEffect } from 'react';
import { intervalToDuration, formatDuration } from 'date-fns';
import { ko } from 'date-fns/locale';

type CountdownTimerProps = {
  targetDate: Date;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
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

  return <div>쿼카레터 공개 : {timeLeft}</div>;
};
