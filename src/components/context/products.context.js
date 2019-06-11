import React from 'react';

export const initialState = {
  loading: true,
  products: null,
  page: 1,
  product: {}
};

export const actions = {
  SET_LOADING: loading => ({ type: 'SET_LOADING', payload: { loading } }),
  SET_PRODUCTS: products => ({
    type: 'SET_PRODUCTS',
    payload: { products }
  }),
  SET_PAGE: page => ({
    type: 'SET_PAGE',
    payload: { page }
  }),
  SET_PRODUCT: product => ({
    type: 'SET_PRODUCT',
    payload: { product }
  })
};

const reducers = {
  SET_LOADING: (state, { payload }) => ({ ...state, ...payload }),
  SET_PRODUCTS: (state, { payload }) => ({ ...state, ...payload }),
  SET_PAGE: (state, { payload }) => ({ ...state, ...payload }),
  SET_PRODUCT: (state, { payload }) => ({ ...state, ...payload })
};

export function productReducer(
  initialState,
  action = { type: '', payload: {}, meta: [] }
) {
  if (reducers[action.type]) {
    return reducers[action.type](initialState, action);
  }
  return initialState;
}

export const ProductContext = React.createContext({});

ProductContext.displayName = 'ProductContext';

export function ProductProvider({ children }) {
  const [state, dispatch] = React.useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}
