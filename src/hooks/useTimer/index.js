import { useEffect, useRef, useState } from 'react';

const useTimer = (time = 0, shouldStart = true) => {
  const timerRef = useRef();
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  useEffect(() => {
    if (shouldStart) {
      timerRef.current = setTimeout(() => {
        setIsTimerFinished(true);
      }, time);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [shouldStart, time]);

  return isTimerFinished;
};

export default useTimer;
