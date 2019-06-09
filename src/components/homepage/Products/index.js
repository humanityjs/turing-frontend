import React, { useEffect, useReducer } from 'react';
import ReactPaginate from 'react-paginate';
import style from './products.module.scss';
import { getProducts } from 'api/products.api';
import {
  actions,
  productReducer,
  initialState
} from '../../context/products.context';
import Loader from '../../../assets/Loader';
import Card from '../../core/card';
import Icon from '../../core/Icon';

export default function Products() {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const handlePageClick = ({ selected }) => {
    dispatch(actions.SET_PAGE(selected + 1));
  };

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
      {state.loading ? (
        <div className={style.loading}>
          <Loader size="200" />
        </div>
      ) : (
        <>
          <div className={`columns ${style.content}`}>
            {state.products.rows.map(product => (
              <div className="column is-one-third" key={product.product_id}>
                <Card {...product} />
              </div>
            ))}
          </div>
          {state.products.count > 20 && (
            <div className={style.pagination}>
              <ReactPaginate
                previousLabel={<Icon icon={['fas', 'angle-double-left']} />}
                nextLabel={<Icon icon={['fas', 'angle-double-right']} />}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(state.products.count / 20)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                forcePage={state.page - 1}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
