import React, { createContext, useContext } from 'react';
import { IAuthState } from 'shared/reducer';
import { IMoviesUpdatingState } from 'shared/reducer/homeMoviesList';

export const DispatchContext = createContext<React.Dispatch<any> | Function>(() => {});
export const useDispatchContext = () => useContext(DispatchContext);

export const AuthContext = createContext<IAuthState>(null);
export const useAuthContext = () => useContext(AuthContext);

type IMovieUpdatingContext = {
  dispatch: React.Dispatch<any>;
  updatingList: IMoviesUpdatingState;
};

const defaultMoviesUpdatingContext = {
  dispatch: () => {},
  updatingList: [],
};

export const MovieUpdatingContext = createContext<IMovieUpdatingContext>(
  defaultMoviesUpdatingContext,
);
export const useHomeContext = () => useContext(MovieUpdatingContext);
