import React from 'react';
import style from './footer.module.css';

export default function Footer() {
  return (
    <div className={style.footer}>
      <p>
        Copyright &copy; {new Date().getFullYear()} T-CULTURE limited. All
        rights reserved.
      </p>
    </div>
  );
}
