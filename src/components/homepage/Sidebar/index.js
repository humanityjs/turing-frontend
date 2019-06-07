import React from 'react';
import { Link } from 'react-router-dom';
import style from './sidebar.module.scss';
import Icon from '../../core/Icon';

export default function Sidebar() {
  return (
    <div className={style.sidebar}>
      <h2 className={style.title}>DEPARTMENTS</h2>
      <ul className={style.list}>
        <li className={style.listItem}>
          <span>
            <Icon className={style.icon} icon={['fas', 'map-marker']} /> Hello{' '}
          </span>
          <Icon className={style.iconRight} icon={['fas', 'chevron-right']} />
          <ul className={style.listChild}>
            <li>
              <Link to="/cat">Cat 1</Link>
            </li>
            <li>
              <Link to="/cat">Cat 1</Link>
            </li>
            <li>
              <Link to="/cat">Cat 1</Link>
            </li>
            <li>
              <Link to="/cat">Cat 1</Link>
            </li>
            <li>
              <Link to="/cat">Cat 1</Link>
            </li>
            <li>
              <Link to="/cat">Cat 1</Link>
            </li>
            <li>
              <Link to="/cat">Cat 1</Link>
            </li>
            <li>
              <Link to="/cat">Cat 1</Link>
            </li>
          </ul>
        </li>
        <li className={style.listItem}>
          <span>
            <Icon className={style.icon} icon={['fas', 'map-marker']} /> Hello{' '}
          </span>
          <Icon className={style.iconRight} icon={['fas', 'chevron-right']} />
          {/* <ul className={style.listChild}>
            <li>Cat 2</li>
            <li>Cat 2</li>
          </ul> */}
        </li>
      </ul>
    </div>
  );
}
