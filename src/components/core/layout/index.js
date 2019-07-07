import React from 'react';
import style from './layout.module.css';
import Header from '../header/Header';
import Footer from '../footer';

export default function Layout({ children }) {
  return (
    <div data-testid="main-app" className={style.layout}>
      <Header />
      <div className={style.content}>{children}</div>
      <Footer />
    </div>
  );
}
