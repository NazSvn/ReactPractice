import { useCallback, useLayoutEffect, useRef, useState } from 'react';

const useWindowResize = (debounceTime = 250) => {
  const [windowSize, setWindowSize] = useState(() => ({
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  }));

  const timeoutIdRef = useRef();

  const clearTimeout = () => {
    if (timeoutIdRef.current) {
      window.clearTimeout(timeoutIdRef.current);
    }
  };

  const handleResize = useCallback(() => {
    clearTimeout();

    timeoutIdRef.current = window.setTimeout(() => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, debounceTime);
  }, [debounceTime]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout();
      window.addEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
};

export default useWindowResize;
