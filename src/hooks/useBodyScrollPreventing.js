import { useEffect } from 'react';

const useBodyScrollPreventing = (isScrollShouldBePrevent) => {
  useEffect(() => {
    if (isScrollShouldBePrevent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isScrollShouldBePrevent]);
};

export default useBodyScrollPreventing;
