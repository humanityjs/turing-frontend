import React from 'react';
import { Link } from 'react-router-dom';
import style from './card.module.scss';

export default function Card({
  thumbnail,
  name,
  product_id,
  price,
  discounted_price
}) {
  return (
    <Link to={`/products/${product_id}`}>
      <div className={`${style.card}`}>
        <div className={style.image}>
          <img
            src={`https://backendapi.turing.com/images/products/${thumbnail}`}
            alt={name}
          />
        </div>
        <div className={style.body}>
          <h2 className={style.name}>{name}</h2>
          <div className={style.price}>
            <h3 className={style.discounted}>${discounted_price}</h3>
            <h4 className={style.realPrice}>${price}</h4>
          </div>
          <div className={style.footer}>
            <button className={style.button}>Buy now</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
