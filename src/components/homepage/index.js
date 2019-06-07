import React from 'react';
import Sidebar from './Sidebar';
import style from './homepage.module.css';
import Layout from '../core/layout';

export default function HomepageComponent() {
  return (
    <Layout>
      <div className="columns">
        <div className={`column is-one-quarter ${style.sidebar}`}>
          <Sidebar />
        </div>
        <div className="column auto">k knflsnf</div>
      </div>
    </Layout>
  );
}
