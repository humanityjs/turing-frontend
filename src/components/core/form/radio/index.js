import React from 'react';
import style from './radio.module.scss';

export default function Radio({ options, name, onClick }) {
  return (
    <div className={style.customRadio}>
      <ul>
        {options.map(option => (
          <li key={option}>
            <input
              onClick={onClick}
              type="radio"
              id={`${name}-${option}`}
              name={name}
              value={option}
            />
            <label htmlFor={`${name}-${option}`}>{option}</label>
            <div className={style.check}>
              <div className={style.inside} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
