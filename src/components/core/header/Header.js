import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import Icon from '../Icon';

export default function Header() {
  const [text, setText] = useState('');
  const onSubmit = event => {
    event.preventDefault();
    window.location.replace(`/?query=${text}`);
  };
  const [searching, toggleSearch] = useState(false);
  const show = searching => (searching ? styles.show : styles.hide);
  const inputRef = React.useRef({});
  React.useEffect(() => {
    if (searching) {
      inputRef.current.focus();
    }
  }, [searching]);
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
                Hi, Bamidele
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">Accounts</a>
                <a className="navbar-item">Orders</a>
                <a className="navbar-item">Logout</a>
              </div>
            </div>
          </div>
          <div className="navbar-item">
            <Icon icon={['fas', 'shopping-cart']} />
          </div>
        </div>
      </div>
    </nav>
  );
}
