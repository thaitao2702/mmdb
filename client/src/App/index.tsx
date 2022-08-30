import React, { useReducer, memo, useMemo } from 'react';

import { StateContext, DispatchContext } from 'shared/context';
import Routes from './Routes';
import './fontStyles.scss'
import './globalStyles.scss';

import Toast from 'App/Toast';
import { IState, reducer } from 'shared/reducer';

const initialState: IState = { toast: [] };

const MemoRoutes = memo(Routes)

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const memoDispatch = useMemo(()=> dispatch , [dispatch]);
    return (
        <StateContext.Provider value={{ state }}>
            <DispatchContext.Provider value={memoDispatch}>
                <MemoRoutes />
                <Toast></Toast>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export default App;