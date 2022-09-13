import { IMovieExtraInfo } from 'User/Home';

type IAction =
  | { type: 'UpdateMovie'; payload: IMovieExtraInfo }
  | { type: 'UpdateDone'; payload: IMovieExtraInfo };

export type IMoviesUpdatingState = { [key: number]: IMovieExtraInfo };

export function reducer(state: IMoviesUpdatingState, action: IAction) {
  switch (action.type) {
    case 'UpdateMovie':
      return { ...state, [action.payload.id]: { ...action.payload } };
    case 'UpdateDone':
      return { ...state, [action.payload.id]: { ...action.payload, isloading: false } };
    default:
      throw new Error();
  }
}
