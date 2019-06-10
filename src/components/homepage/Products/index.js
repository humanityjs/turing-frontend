import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import style from './products.module.scss';
import {
  getProducts,
  getProductsWithCategory,
  productSearch
} from 'api/products.api';
import { actions, ProductContext } from '../../context/products.context';
import Loader from '../../../assets/Loader';
import Card from '../../core/card';
import Icon from '../../core/Icon';
import { splitUrl } from 'utils';

const methods = {
  WITH_CATEGORY: getProductsWithCategory,
  WITHOUT_CATEGORY: getProducts,
  SEARCH: productSearch
};

function Products(props) {
  const { category, page, query } = splitUrl(props.location.search);

  const { state, dispatch } = useContext(ProductContext);

  const handlePageClick = ({ selected }) => {
    dispatch(actions.SET_PAGE(selected + 1));
  };

  useEffect(() => {
    if (page) {
      dispatch(actions.SET_PAGE(page));
    }
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(actions.SET_LOADING(true));
    let method = category ? 'WITH_CATEGORY' : 'WITHOUT_CATEGORY';
    method = query ? 'SEARCH' : method;
    methods[method](state.page, query || category)
      .then(({ data }) => {
        dispatch(actions.SET_PRODUCTS(data));
        dispatch(actions.SET_LOADING(false));
      })
      .catch(error => {
        console.log(error);
      });
  }, [state.page, dispatch, category, query]);

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

export default withRouter(Products);
