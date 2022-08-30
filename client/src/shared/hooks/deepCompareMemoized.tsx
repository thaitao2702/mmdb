import { useRef } from 'react';
import { isEqual } from 'lodash';

function useDeepCompareMemoize<T>(value:T) {
  const valueRef = useRef<T>();

  if (!isEqual(value, valueRef.current)) {
    valueRef.current = value;
  }
  return valueRef.current;
};

export default useDeepCompareMemoize;