import React, { useContext, useEffect, useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { AuthContext } from '../context/auth.context';
import { ProductContext } from '../context/products.context';
import { getShippingMethods } from 'api/cart.api';
import RadioButton from '../core/form/radio';
import CheckoutForm from './CheckoutForm';
import style from './checkout.module.scss';

Modal.setAppElement('#modal-component');

export default function CheckoutComponent() {
  const {
    state: { user, isAuthenticated }
  } = useContext(AuthContext);

  const {
    state: { cart }
  } = useContext(ProductContext);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [modalIsOpen, setModalStatus] = useState(false);
  const [stepOne, setStepOne] = useState(false);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);

  let cartTotal = 0;

  if (cart) {
    cartTotal = cart.reduce(
      (prev, acc) => prev + parseFloat(acc.subtotal),
      cartTotal
    );
  }

  const grandTotal = parseFloat(cartTotal + shippingFee).toFixed(2);

  cartTotal = cartTotal.toFixed(2);

  const detailsCompleted = () => {
    const {
      address_1,
      credit_card,
      postal_code,
      city,
      region,
      shipping_region_id
    } = user || {};

    if (
      !address_1 ||
      !credit_card ||
      !postal_code ||
      !city ||
      !region ||
      !shipping_region_id
    ) {
      return false;
    }

    return true;
  };

  const setRealShippingMethod = event => {
    const shippingMethod = shippingMethods.find(
      method => method.shipping_type === event.target.value
    );
    setShippingFee(parseFloat(shippingMethod.shipping_cost));
    setSelectedShippingMethod(shippingMethod.shipping_id);
  };

  useEffect(() => {
    if (user && user.shipping_region_id) {
      getShippingMethods(user.shipping_region_id).then(({ data }) => {
        setShippingMethods(data);
      });
    }
  }, [user]);

  if (detailsCompleted() && !stepOne) {
    setStepOne(true);
  }

  const shippingMapped = shippingMethods.map(method => method.shipping_type);
  return (
    <>
      {cart.length > 0 ? (
        <StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
          <div className={style.checkout}>
            {isAuthenticated ? (
              <div>
                <h2 className={style.title}>CHECKOUT</h2>
                <div>
                  <div className={style.step}>
                    <div className={style.header}>
                      <h2 className={style.title}>1. Contact Details</h2>
                    </div>
                    <div className={style.body}>
                      <h3 className={style.body__title}>{user.name}</h3>
                      {!detailsCompleted() ? (
                        <Link
                          to="/account?redirect=checkout"
                          className={style.button}
                        >
                          UPDATE YOUR ACCOUNT TO CONTINUE
                        </Link>
                      ) : (
                        <>
                          <p className={style.body__body}>{user.address_1}</p>
                          <p className={style.body__body}>
                            {user.mob_phone || 'No phone added'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: 10 }}>
                  <div className={style.step}>
                    <div className={style.header}>
                      <h2 className={style.title}>2. Shipping Method</h2>
                    </div>
                    {stepOne && (
                      <div className={style.body}>
                        <p className={style.body__title_small}>
                          Select a shipping method
                        </p>

                        <div className={style.shippingMethods}>
                          <RadioButton
                            options={shippingMapped}
                            name="shippingMethods"
                            flex={false}
                            onClick={setRealShippingMethod}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ paddingTop: 10 }}>
                  <div className={style.step}>
                    <div className={style.header}>
                      <h2 className={style.title}>3. Payment</h2>
                    </div>
                    {selectedShippingMethod && (
                      <>
                        <div className={style.body}>
                          <p className={style.body__title_small}>
                            Order Summary
                          </p>
                          <div style={{ paddingTop: 20 }}>
                            <div className={style.separator}>
                              <h3 className={style.label}>Subtotal</h3>
                              <p className={style.value}>${cartTotal}</p>
                            </div>
                            <div className={style.separator}>
                              <h3 className={style.label}>Shipping fee</h3>
                              <p className={style.value}>${shippingFee}</p>
                            </div>
                            <div className={style.separator}>
                              <h3 className={style.label}>Tax</h3>
                              <p className={style.value}>$0</p>
                            </div>
                            <div
                              className={`${style.separator} ${style.border}`}
                            >
                              <h3 className={style.total_label}>Total</h3>
                              <p className={style.total_value}>${grandTotal}</p>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: 20 }}>
                          <button
                            onClick={() => setModalStatus(true)}
                            className={style.paymentButton}
                          >
                            Pay Now
                          </button>
                        </div>
                      </>
                    )}
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalStatus(!modalIsOpen)}
                      contentLabel="Example Modal"
                      className={style.modal}
                      overlayClassName={style.overlay}
                    >
                      <Elements>
                        <CheckoutForm
                          shippingId={selectedShippingMethod}
                          grandTotal={grandTotal}
                          closeModal={() => setModalStatus(false)}
                        />
                      </Elements>
                    </Modal>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className={style.loginText}>You need to login to continue</p>
                <Link to="/login?redirect=checkout" className={style.button}>
                  Login
                </Link>
              </div>
            )}
          </div>
        </StripeProvider>
      ) : (
        <div className={style.noItem}>
          <h3>No item in cart</h3>
          <p>Please add Items to cart to continue.</p>
        </div>
      )}
    </>
  );
}
