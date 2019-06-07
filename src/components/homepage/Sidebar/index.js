import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDepartments, getCategoriesByDepartment } from 'api/categories.api';
import {
  actions,
  categoryReducer,
  initialState
} from '../../context/categories.context';
import style from './sidebar.module.scss';
import Icon from '../../core/Icon';
import Loader from '../../../assets/Loader';

const processCategories = (departments, dispatch) => {
  let promises = [];
  departments.forEach(({ department_id }) =>
    promises.push(getCategoriesByDepartment(department_id))
  );
  Promise.all(promises).then(promise => {
    for (const [index, department] of promise.entries()) {
      const payload = {
        department: departments[index].name,
        categories: department.data
      };
      dispatch(actions.SET_CATEGORY(payload));
    }
    dispatch(actions.SET_LOADING(false));
  });
};

export default function Sidebar() {
  const [state, dispatch] = useReducer(categoryReducer, initialState);
  const [apiLoaded, setApiLoaded] = useState(false);
  useEffect(() => {
    if (!apiLoaded) {
      getDepartments().then(({ data }) => {
        setApiLoaded(true);
        processCategories(data, dispatch);
      });
    }
  });

  const NavLinks = Object.keys(state.categories).map(department => (
    <li className={style.listItem} key={department}>
      <span>
        <Icon className={style.icon} icon={['fas', 'map-marker']} />{' '}
        {department}
      </span>
      <Icon className={style.iconRight} icon={['fas', 'chevron-right']} />
      <ul className={style.listChild}>
        <li className={style.catTitle}>CATEGORIES</li>
        {state.categories[department].map(cat => (
          <li key={cat.name}>
            <Link to={`/categories/${cat.name}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </li>
  ));
  return (
    <div className={style.sidebar}>
      <h2 className={style.title}>DEPARTMENTS</h2>
      {state.loading ? (
        <div className={style.loading}>
          <Loader size="50" />
        </div>
      ) : (
        <ul className={style.list}>{NavLinks}</ul>
      )}
    </div>
  );
}
