import {createContext, useContext } from 'react';

export const StateContext = createContext<{[key:string]:any}>({});
export const useGlobalContext = () => useContext(StateContext);

export const DispatchContext = createContext<React.Dispatch<any> | Function>(()=>{})
export const useDispatchContext = () => useContext(DispatchContext);
