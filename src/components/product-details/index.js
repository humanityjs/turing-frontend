import React, { useEffect, useContext, useState } from 'react';
import { getProduct } from 'api/products.api';
import { Link } from 'react-router-dom';
import { actions, ProductContext } from '../context/products.context';
import style from './productdetails.module.scss';
import Reviews from './Reviews';

export default function ProductDetailsComponent({ productId }) {
  const {
    state: { product },
    dispatch
  } = useContext(ProductContext);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(actions.SET_LOADING(true));
    getProduct(productId).then(({ data }) => {
      dispatch(actions.SET_PRODUCT(data));
      setLoading(false);
    });
  }, [productId, dispatch]);
  console.log(product);
  return (
    <>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <div className={style.productDetails}>
          <nav
            className="breadcrumb has-succeeds-separator is-small"
            aria-label="breadcrumbs"
          >
            <ul>
              <li>
                <Link to="/">Products</Link>
              </li>
              <li className="is-active">
                <a href="#" aria-current="page">
                  {product.name}
                </a>
              </li>
            </ul>
          </nav>
          <div className={`columns ${style.productContainer}`}>
            <div className={`column is-two-fifths`}>
              <div className={style.imageDiv}>
                <img
                  src={`https://backendapi.turing.com/images/products/${
                    product.image
                  }`}
                  alt={product.name}
                />
              </div>
            </div>
            <div className={`column auto`}>
              <div className={style.details}>
                <h2>{product.name}</h2>
                <div className={style.description}>
                  <p>{product.description}</p>
                </div>
                <div className={style.price}>
                  <span className={style.discounted}>
                    ${product.discounted_price}
                  </span>
                  <span className={style.realPrice}>${product.price}</span>
                </div>
                <div className={style.quantity}>
                  <label>Quantity:</label>
                  <div className="field">
                    <div className="control">
                      <input className="input" type="number" placeholder="1" />
                    </div>
                  </div>
                </div>
                <div className={style.actionButton}>
                  <button>Add to cart</button>
                </div>
              </div>
            </div>
          </div>
          <Reviews productId={product.product_id} />
        </div>
      )}
    </>
  );
}
