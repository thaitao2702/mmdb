import { useRef, useState } from 'react';

export const usePreventRaceCondition = (apiFunc: (...args: any) => Promise<any>) => {
  const lastApiOrder = useRef(0);
  const [data, setData] = useState<{ [key: string]: any }>({
    data: {},
    loading: false,
    error: false,
  });

  const returnFunc = (...params: any[]) =>
    new Promise((resolve, reject) => {
      lastApiOrder.current = lastApiOrder.current + 1;
      const requestOrder = lastApiOrder.current;
      if (!data.loading) setData({ ...data, loading: true });
      apiFunc(...params)
        .then((data) => {
          if (requestOrder === lastApiOrder.current) {
            resolve(data);
            setData({ data, loading: false });
            lastApiOrder.current = 0;
          }
        })
        .catch((err) => {
          setData({ ...data, error: true, loading: false });
          reject(err);
        });
    });

  return [returnFunc, data] as const;
};

export default usePreventRaceCondition;
