import React from 'react';

let initialState = {
  user: null,
  accessToken: window.localStorage.getItem('accessToken'),
  isAuthenticated: false
};

export const actions = {
  SET_USER: user => ({
    type: 'SET_USER',
    payload: { user }
  }),
  SET_TOKEN: accessToken => ({
    type: 'SET_TOKEN',
    payload: { accessToken }
  }),
  SET_AUTH: isAuthenticated => ({
    type: 'SET_AUTH',
    payload: { isAuthenticated }
  })
};

const reducers = {
  SET_USER: (state, { payload }) => ({ ...state, ...payload }),
  SET_TOKEN: (state, { payload }) => ({ ...state, ...payload }),
  SET_AUTH: (state, { payload }) => ({ ...state, ...payload })
};

export function authReducer(
  initialState,
  action = { type: '', payload: {}, meta: [] }
) {
  if (reducers[action.type]) {
    return reducers[action.type](initialState, action);
  }
  return initialState;
}

export const AuthContext = React.createContext({});

AuthContext.displayName = 'AuthContext';

export function AuthProvider({ children, dummyState }) {
  // for testing purpose
  if (dummyState) {
    initialState = dummyState;
  }
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { initialState };
