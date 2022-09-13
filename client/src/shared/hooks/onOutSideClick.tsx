import { useEffect, useRef, MouseEvent, MutableRefObject } from 'react';
import useDeepCompareMemoize from './deepCompareMemoized';

const useOnOutsideClick = (
  $ignoredElementRefs: MutableRefObject<any>[],
  isListening: boolean,
  onOutsideClick: (...args: any[]) => any,
  $listeningElementRef: MutableRefObject<any> | null,
) => {
  const $mouseDownTargetRef = useRef<any>();
  const $ignoredElementRefsMemoized = useDeepCompareMemoize($ignoredElementRefs);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      $mouseDownTargetRef.current = event;
    };

    const handleMouseUp = (event: MouseEvent) => {
      const isClickedOnScrollBar = $mouseDownTargetRef.current.clientX > document.body.clientWidth;
      const isAnyIgnoredElementAncestorOfTarget =
        $ignoredElementRefsMemoized &&
        ($ignoredElementRefsMemoized || []).some(
          ($elementRef) =>
            $elementRef.current.contains($mouseDownTargetRef.current.target) ||
            $elementRef.current.contains(event.target),
        );
      if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget && !isClickedOnScrollBar) {
        onOutsideClick();
      }
    };

    const $listeningElement = ($listeningElementRef || {}).current || document;

    if (isListening) {
      $listeningElement.addEventListener('mousedown', handleMouseDown);
      $listeningElement.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown);
      $listeningElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [$ignoredElementRefsMemoized, $listeningElementRef, isListening, onOutsideClick]);
};

export default useOnOutsideClick;
