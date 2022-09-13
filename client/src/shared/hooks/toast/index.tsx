import { useDispatchContext } from 'shared/context';
import { uniqueId } from 'lodash';

const useToast = () => {
  const dispatch = useDispatchContext();
  const displayToast = (type: string, message: string, timeOut: number = 5000) => {
    const toastId = uniqueId('toast-');
    dispatch({
      type: 'AddToast',
      payload: {
        id: toastId,
        type,
        message,
        timeOut,
      },
    });

    setTimeout(() => closeToast(toastId), timeOut);
  };

  const closeToast = (id: string) => {
    dispatch({
      type: 'RemoveToast',
      payload: id,
    });
  };

  const Toast = {
    error: (message: string, timeOut?: number) => displayToast('error', message, timeOut),
    success: (message: string, timeOut?: number) => displayToast('success', message, timeOut),
    warning: (message: string, timeOut?: number) => displayToast('warning', message, timeOut),
    info: (message: string, timeOut?: number) => displayToast('info', message, timeOut),
    close: closeToast,
  };

  return Toast;
};

export default useToast;
