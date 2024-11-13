import { useCallback, useEffect } from 'react';

const useOutsideClick = (ref, handler, enabled = true) => {
  const handleTarget = useCallback(
    (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler(e);
    },
    [ref, handler]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('mousedown', handleTarget);
    document.addEventListener('touchstart', handleTarget);

    return () => {
      removeEventListener('mousedown', handleTarget);
      removeEventListener('touchstart', handleTarget);
    };
  }, [enabled, handleTarget]);
};

export default useOutsideClick;
