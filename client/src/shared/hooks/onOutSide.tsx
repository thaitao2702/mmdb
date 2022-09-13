import { useEffect, MouseEvent, MutableRefObject } from 'react';

const useOnOutside = (
  $listeningElementRef: MutableRefObject<any>,
  isListening: boolean,
  onOutside: (...args: any[]) => any,
) => {
  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      console.log(event);
      onOutside();
    };
    const $listeningElement = ($listeningElementRef || {}).current;

    if (isListening && $listeningElement) {
      $listeningElement.addEventListener('mouseleave', handleMouseOut);
    }
    return () => {
      if ($listeningElement) $listeningElement.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [$listeningElementRef, isListening, onOutside]);
};

export default useOnOutside;
