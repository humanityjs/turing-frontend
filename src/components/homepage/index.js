import React from 'react';
import Sidebar from './Sidebar';
import style from './homepage.module.css';
import Products from './Products';

export default function HomepageComponent() {
  return (
    <div className="columns">
      <div className="column is-one-quarter no-pad">
        <div className={style.sidebar}>
          <Sidebar />
        </div>
      </div>
      <div className="column auto">
        <Products />
      </div>
    </div>
  );
}
