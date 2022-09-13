import React, { useReducer, memo } from 'react';

import Routes from './Routes';
import './fontStyles.scss';
import './globalStyles.scss';

import Toast from 'App/Toast';
import { defaultGlobalState, reducer } from 'shared/reducer';
import { AuthContext, DispatchContext } from 'shared/context';
import useDeepCompareMemoize from 'shared/hooks/deepCompareMemoized';

const MemoRoutes = memo(Routes);

const App = () => {
  const [globalState, dispatch] = useReducer(reducer, defaultGlobalState);
  const { user, toast } = globalState;
  const userMemoize = useDeepCompareMemoize(user);

  return (
    <AuthContext.Provider value={userMemoize}>
      <DispatchContext.Provider value={dispatch}>
        <MemoRoutes />
        <Toast toast={toast}></Toast>
      </DispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
