import React, { useEffect, useReducer } from 'react';
import style from './products.module.scss';
import { getProducts } from 'api/products.api';
import {
  actions,
  productReducer,
  initialState
} from '../../context/products.context';
import Loader from '../../../assets/Loader';
import Card from '../../core/card';

export default function Products() {
  const [state, dispatch] = useReducer(productReducer, initialState);
  useEffect(() => {
    dispatch(actions.SET_LOADING(true));
    getProducts(state.page)
      .then(({ data }) => {
        dispatch(actions.SET_PRODUCTS(data));
        dispatch(actions.SET_LOADING(false));
      })
      .catch(error => {
        console.log(error);
      });
  }, [state.page]);
  const currentProducts = `${(state.page - 1) * 20 + 1} - ${state.page * 20}`;
  return (
    <div className={style.productContainer}>
      <div className={style.header}>
        <h2>All Products</h2>
        {!state.loading && (
          <span>
            ~ Showing <span className={style.bold}>{currentProducts}</span> of{' '}
            <span className={style.bold}>{state.products.count}</span> products
          </span>
        )}
      </div>
      <div className={`columns ${style.content}`}>
        {state.loading ? (
          <div className={style.loading}>
            <Loader size="200" />
          </div>
        ) : (
          <>
            {state.products.rows.map(product => (
              <div className="column is-one-third" key={product.product_id}>
                <Card {...product} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
