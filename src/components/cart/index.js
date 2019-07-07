import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { actions, ProductContext } from '../context/products.context';
import { removeProduct } from 'api/cart.api';
import Icon from '../core/Icon';
import style from './cart.module.scss';
import QuantityPicker from '../core/form/quantity-picker';

export default function CartComponent() {
  const {
    state: { cart },
    dispatch
  } = useContext(ProductContext);
  let cartTotal = 0;

  if (cart) {
    cartTotal = cart.reduce(
      (prev, acc) => prev + parseFloat(acc.subtotal),
      cartTotal
    );
  }

  const removeFromCart = async itemId => {
    try {
      await removeProduct(itemId);
      const cartClone = cart
        .map(item => item)
        .filter(item => item.item_id !== itemId);
      dispatch(actions.SET_CART(cartClone));
    } catch (e) {
      console.log('error');
    }
  };

  return (
    <div className={style.cart}>
      <h2 className={style.cartHeader}>
        Cart ({cart ? cart.length : 0} items)
      </h2>
      <div className={style.items}>
        {cart && cart.length > 0 ? (
          <>
            {cart.map(item => {
              const color = item.attributes.split(',')[0];
              const size = item.attributes.split(',')[1];
              return (
                <div
                  id={`cart-${item.item_id}`}
                  key={item.item_id}
                  className={style.item}
                >
                  <div className={style.imageHolder}>
                    <img
                      src={`https://backendapi.turing.com/images/products/${
                        item.image
                      }`}
                      alt={item.name}
                    />
                  </div>
                  <div className={style.productDetails}>
                    <div>
                      <Link
                        to={`/products/${item.product_id}`}
                        className={style.link}
                      >
                        {item.name}
                      </Link>
                      <p className={style.attribute}>
                        <span style={{ color }}>{color}</span>,
                        <span>{size}</span>
                      </p>
                    </div>
                    <div className={style.actions}>
                      <button
                        onClick={() => removeFromCart(item.item_id)}
                        className={style.button}
                        id={`delete-${item.item_id}`}
                      >
                        <Icon icon={['fas', 'trash']} /> Delete
                      </button>
                    </div>
                  </div>
                  <div className={style.quantity}>
                    <h2>Quantity</h2>
                    <QuantityPicker
                      defaultValue={item.quantity}
                      onChange={() => null}
                      itemId={item.item_id}
                      isEdit={true}
                    />
                  </div>
                  <div className={style.price}>
                    <h2>Unit Price</h2>
                    <h1>${item.price}</h1>
                  </div>
                  <div className={style.subtotal}>
                    <h2>Subtotal</h2>
                    <h1>${item.subtotal}</h1>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className={style.noItem}>
            <p>No item in cart</p>
          </div>
        )}
      </div>
      {cart && cart.length > 0 && (
        <div className={style.total}>
          <h2>
            Total:{' '}
            <span className={style.grandtotal}>${cartTotal.toFixed(2)}</span>
          </h2>
          <Link to="/checkout">Procceed to checkout</Link>
        </div>
      )}
    </div>
  );
}
