type  IAction =  { type: "AddToast"; payload: IToast } | { type: "RemoveToast"; payload: IToastId }

type IToastId = string;

export interface IToast {
    id: string,
    type: string,
    message: '',
    timeOut?: number
}

export interface IState {
    toast: IToast[]
}

export function reducer(state: IState, action: IAction) {
    switch (action.type) {
        case "AddToast":
            return { ...state, toast: [...state.toast, action.payload] };
        case "RemoveToast":
            return {...state, toast: state.toast.filter(t => t.id !== action.payload )}
        default:
            throw new Error();
    }
}