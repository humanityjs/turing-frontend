import React from 'react';

let initialState = {
  loading: true,
  products: null,
  page: 1,
  product: {},
  cart: null,
  cartId: window.localStorage.getItem('cartId') || null
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
  }),
  SET_CART: cart => ({
    type: 'SET_CART',
    payload: { cart }
  }),
  SET_CART_ID: cartId => ({
    type: 'SET_CART_ID',
    payload: { cartId }
  }),
  ADD_TO_CART: product => ({
    type: 'ADD_TO_CART',
    payload: { product }
  })
};

const reducers = {
  SET_LOADING: (state, { payload }) => ({ ...state, ...payload }),
  SET_PRODUCTS: (state, { payload }) => ({ ...state, ...payload }),
  SET_PAGE: (state, { payload }) => ({ ...state, ...payload }),
  SET_PRODUCT: (state, { payload }) => ({ ...state, ...payload }),
  SET_CART: (state, { payload }) => ({ ...state, ...payload }),
  SET_CART_ID: (state, { payload }) => ({ ...state, ...payload }),
  ADD_TO_CART: (state, { payload }) => {
    const newCart = [...state.cart];
    newCart.push(payload.product);
    return { ...state, cart: newCart };
  }
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

export function ProductProvider({ children, dummyState }) {
  if (dummyState) {
    initialState = dummyState;
  }
  const [state, dispatch] = React.useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export { initialState };
