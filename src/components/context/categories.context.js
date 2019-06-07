export const initialState = {
  loading: true,
  departments: [],
  categories: {}
};

export const actions = {
  SET_LOADING: loading => ({ type: 'SET_LOADING', payload: { loading } }),
  SET_DEPARTMENTS: departments => ({
    type: 'SET_DEPARTMENTS',
    payload: { departments }
  }),
  SET_CATEGORY: ({ department, categories }) => ({
    type: 'SET_CATEGORY',
    payload: { categories, department }
  })
};

const reducers = {
  SET_LOADING: (state, { payload }) => ({ ...state, ...payload }),
  SET_DEPARTMENTS: (state, { payload }) => ({ ...state, ...payload }),
  SET_CATEGORY: (state, { payload }) => {
    const categories = { ...state.categories };
    categories[payload.department] = payload.categories;
    return {
      ...state,
      categories
    };
  }
};

export function categoryReducer(
  initialState,
  action = { type: '', payload: {}, meta: [] }
) {
  if (reducers[action.type]) {
    return reducers[action.type](initialState, action);
  }
  return initialState;
}
