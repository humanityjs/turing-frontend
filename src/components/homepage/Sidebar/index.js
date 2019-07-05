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
import { splitUrl } from 'utils';

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
  const { category } = splitUrl(window.location.search);
  const [selected, setSelected] = useState(initialState);
  useEffect(() => {
    getDepartments().then(({ data }) => {
      processCategories(data, dispatch);
    });
  }, []);

  useEffect(() => {
    let selected = null;
    if (category) {
      for (const item of Object.keys(state.categories)) {
        state.categories[item].map(cat => {
          if (parseInt(cat.category_id, 10) === parseInt(category, 10)) {
            selected = item;
          }
        });
      }
    }
    setSelected(selected);
  }, [category, state.categories]);

  const NavLinks = Object.keys(state.categories).map(department => (
    <li className={style.listItem} key={department}>
      <div className={style.listContent}>
        <span className={selected === department ? style.isSelected : ''}>
          <Icon className={style.icon} icon={['fas', 'map-marker']} />{' '}
          {department}
        </span>
      </div>
      <ul className={style.listChild}>
        {state.categories[department].map(cat => {
          const isSelected =
            parseInt(cat.category_id, 10) === parseInt(category, 10);
          return (
            <li key={cat.name}>
              <Link
                className={isSelected ? style.isSelected : ''}
                to={`/?category=${cat.category_id}`}
              >
                - {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  ));
  return (
    <div className={style.sidebar}>
      <h2 className={style.title}>CATEGORIES</h2>
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
