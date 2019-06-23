import React, { useEffect, useContext, useState } from 'react';
import { getProduct, getAttributes } from 'api/products.api';
import { addToCart } from 'api/cart.api';
import { Link } from 'react-router-dom';
import { actions, ProductContext } from '../context/products.context';
import style from './productdetails.module.scss';
import Reviews from './Reviews';
import Radio from '../core/form/radio';

export default function ProductDetailsComponent({ productId }) {
  const {
    state: { product, cartId },
    dispatch
  } = useContext(ProductContext);
  const [isLoading, setLoading] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errors, setErrors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const processAttributes = attributes => {
    let result = {};
    const attr = {};
    for (const attribute of attributes) {
      if (result[attribute.attribute_name]) {
        result[attribute.attribute_name].push(attribute.attribute_value);
        continue;
      }
      result[attribute.attribute_name] = [attribute.attribute_value];
      attr[attribute.attribute_name] = '';
    }
    setAttributes(result);
    setSelectedAttributes(attr);
  };

  const onClick = e => {
    const newState = { ...selectedAttributes, [e.target.name]: e.target.value };
    setSelectedAttributes(newState);
  };

  const validate = () => {
    let errors = [];
    if (quantity < 1) {
      errors.push('Please increase the quantity to 1 or more.');
    }
    Object.keys(selectedAttributes).map(attr => {
      if (!selectedAttributes[attr]) {
        errors.push(`Please select a ${attr}`);
      }
    });
    setErrors(errors);
    return errors.length <= 0;
  };

  const addCart = async e => {
    e.preventDefault();
    setErrors([]);
    setIsAdded(false);
    setMessage('');
    if (validate()) {
      let attributes = '';
      Object.keys(selectedAttributes).map(attr => {
        attributes += `${selectedAttributes[attr]}, `;
      });
      try {
        const newProduct = await addToCart({
          cartId,
          productId,
          attributes,
          quantity
        });
        dispatch(actions.SET_CART(newProduct.data));
        setIsAdded(true);
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  useEffect(() => {
    dispatch(actions.SET_LOADING(true));
    const promises = [getProduct(productId), getAttributes(productId)];
    Promise.all(promises).then(results => {
      dispatch(actions.SET_PRODUCT(results[0].data));
      processAttributes(results[1].data);
      setLoading(false);
    });
  }, [productId, dispatch]);

  const noDiscount = parseInt(product.discounted_price, 10) === 0;

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
                <h2 className={style.bb}>{product.name}</h2>
                <div className={style.description}>
                  <p>{product.description}</p>
                </div>
                <div className={style.price}>
                  <span className={style.discounted}>
                    ${noDiscount ? product.price : product.discounted_price}
                  </span>
                  {!noDiscount && (
                    <span className={style.realPrice}>${product.price}</span>
                  )}
                </div>
                <div className={style.quantity}>
                  <label>Quantity</label>
                  <div className="field">
                    <div className="control">
                      <input
                        onChange={e => setQuantity(e.target.value)}
                        className="input"
                        type="number"
                        placeholder="1"
                        value={quantity}
                      />
                    </div>
                  </div>
                </div>
                {Object.keys(attributes).map(attribute => (
                  <div className={style.attributes} key={attribute}>
                    <h2>Pick a {attribute}</h2>
                    <Radio
                      onClick={onClick}
                      options={attributes[attribute]}
                      name={attribute}
                    />
                  </div>
                ))}
                <div className={style.actionButton}>
                  <button onClick={addCart}>Add to cart</button>
                </div>
                <div className={style.errors}>
                  <ul>
                    {errors.map(error => (
                      <li key={error}> - {error}</li>
                    ))}
                  </ul>
                </div>
                <div className={style.message}>
                  {isAdded && (
                    <p className={style.success}>
                      Product added to cart. Click <Link to="/cart">here</Link>{' '}
                      to checkout.
                    </p>
                  )}
                  {message && <>{message}</>}
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
