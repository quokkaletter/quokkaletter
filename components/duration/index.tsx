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
  const [isScheduledOpenDate, setIsScheduledOpenDate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (now >= targetDate) {
        setTimeLeft('쿼카레터가 공개되었습니다! 🍀');
        setIsScheduledOpenDate(true);
        clearInterval(interval);
        return;
      }

      const duration = intervalToDuration({ start: now, end: targetDate });
      const formattedDuration = formatDuration(duration, {
        locale: ko,
      });
      setTimeLeft(formattedDuration);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft === '') return null;

  return (
    <div>
      {showLabel && !isScheduledOpenDate
        ? `쿼카레터 공개 : ${timeLeft}`
        : timeLeft}
    </div>
  );
};
