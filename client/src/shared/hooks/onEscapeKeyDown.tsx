import { useEffect } from 'react';

import { KeyCodes } from 'shared/const';

const useOnEscapeKeyDown = (isListening: boolean, onEscapeKeyDown: (...args: any[]) => any) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === KeyCodes.ESCAPE) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, onEscapeKeyDown]);
};

export default useOnEscapeKeyDown;
