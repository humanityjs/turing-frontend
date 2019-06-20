import React, { useState, useContext, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import { actions, ProductContext } from '../../context/products.context';
import {
  actions as userActions,
  AuthContext
} from '../../context/auth.context';
import { getCart, createCart } from 'api/cart.api';
import styles from './header.module.scss';
import Icon from '../Icon';

export default function Header() {
  const [text, setText] = useState('');
  const onSubmit = event => {
    event.preventDefault();
    window.location.replace(`/?query=${text}`);
  };
  const { state, dispatch } = useContext(ProductContext);
  const { state: userState, dispatch: userDispatch } = useContext(AuthContext);
  const [searching, toggleSearch] = useState(false);
  const show = searching => (searching ? styles.show : styles.hide);
  const inputRef = React.useRef({});
  useEffect(() => {
    if (searching) {
      inputRef.current.focus();
    }
  }, [searching]);

  useEffect(() => {
    if (state.cartId) {
      getCart(state.cartId).then(({ data }) => {
        dispatch(actions.SET_CART(data));
      });
    } else {
      createCart().then(({ data }) => {
        window.localStorage.setItem('cartId', data.cart_id);
        dispatch(actions.SET_CART_ID(data.cart_id));
      });
    }
  }, [state.cartId, dispatch]);

  const logout = e => {
    e.preventDefault();
    window.localStorage.removeItem('accessToken');
    userDispatch(userActions.SET_TOKEN(null));
    userDispatch(userActions.SET_USER(null));
    userDispatch(userActions.SET_AUTH(false));
  };
  return (
    <nav
      className={`navbar ${styles.mainNav}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className={styles.header}>
        <div className={styles.right}>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
          <div className={styles.logo}>
            <Link to="/">T-CULTURE</Link>
          </div>
        </div>
        <div className={styles.left}>
          <div className="navbar-menu">
            <div
              className={`field ${styles.noMargin} ${
                styles.searchContainer
              } ${show(searching)}`}
            >
              <form
                className={`${styles.form} ${styles.searchForm}`}
                onSubmit={onSubmit}
              >
                <p className="control has-icons-left has-icons-right">
                  <DebounceInput
                    className={`grow input ${styles.searchbox}`}
                    type="text"
                    role="search"
                    value={text}
                    inputRef={inputRef}
                    minLength={2}
                    debounceTimeout={300}
                    onChange={event => setText(event.target.value)}
                  />
                  <span className={`icon is-small is-left ${styles.icon}`}>
                    <Icon
                      className={styles.icon}
                      fill="#fff"
                      icon={['fas', 'search']}
                    />
                  </span>
                </p>
              </form>
            </div>
            <button
              className={styles.searchButton}
              onClick={() => toggleSearch(!searching)}
            >
              {searching ? (
                <Icon icon={['fas', 'times']} />
              ) : (
                <Icon icon={['fas', 'search']} />
              )}
            </button>
            <div
              className={`navbar-item has-dropdown is-hoverable ${
                styles.accountDropdown
              }`}
            >
              <a className={`navbar-link ${styles.accountDropdown}`}>
                Hi, {userState.isAuthenticated ? userState.user.name : 'Guest'}
              </a>

              <div className="navbar-dropdown">
                {userState.isAuthenticated ? (
                  <>
                    <Link to="/account" className="navbar-item">
                      Accounts
                    </Link>
                    <a href="#" className="navbar-item">
                      Orders
                    </a>
                    <a onClick={logout} className="navbar-item">
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="navbar-item">
                      Login
                    </Link>
                    <Link to="/create-account" className="navbar-item">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`navbar-item ${styles.cart}`}>
            <Link to="/cart" className={styles.cartButton}>
              <Icon icon={['fas', 'shopping-cart']} />
            </Link>
            {state.cart && state.cart.length > 0 && (
              <span className={styles.count}>{state.cart.length}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
