export const initialState = {
  loading: true,
  products: [],
  page: 1
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
  })
};

const reducers = {
  SET_LOADING: (state, { payload }) => ({ ...state, ...payload }),
  SET_PRODUCTS: (state, { payload }) => ({ ...state, ...payload }),
  SET_PAGE: (state, { payload }) => ({ ...state, ...payload })
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
