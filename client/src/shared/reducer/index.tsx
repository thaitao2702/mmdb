import { UserRole } from 'shared/const';

export type IAuthState =
  | {
      userId: number | string;
      token: string;
      userRole: UserRole;
    }
  | null
  | undefined;

export const defaultGlobalState: IGlobalState = {
  toast: [],
  user: null,
};

type IAction =
  | { type: 'AddToast'; payload: IToast }
  | { type: 'RemoveToast'; payload: IToastId }
  | { type: 'AuthSuccess'; payload: IAuthState }
  | { type: 'Logout' };

type IToastId = string;

export interface IToast {
  id: string;
  type: string;
  message: '';
  timeOut?: number;
}

export interface IGlobalState {
  toast: IToast[];
  user: IAuthState | null;
}

export function reducer(state: IGlobalState, action: IAction) {
  switch (action.type) {
    case 'AddToast':
      return { ...state, toast: [...state.toast, action.payload] };
    case 'RemoveToast':
      return { ...state, toast: state.toast.filter((t) => t.id !== action.payload) };
    case 'AuthSuccess':
      return { ...state, user: action.payload };
    case 'Logout':
      return { ...state, user: null };
    default:
      throw new Error();
  }
}
