import { useEffect, useRef, useState } from 'react';

const calculateTimeLeft = (targetDate) => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;
  const isCompleted = difference <= 0;
  if (isCompleted) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isCompleted };
};

const useCountdownTimer = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const timerRef = useRef();
  useEffect(() => {
    if (!timeLeft.isCompleted && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft(calculateTimeLeft(targetDate));
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [targetDate, timeLeft.isCompleted]);
  return timeLeft;
};

export default useCountdownTimer;
