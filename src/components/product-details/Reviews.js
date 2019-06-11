import React, { useEffect, useState } from 'react';
import Rater from 'react-rater';
import Swal from 'sweetalert2';
import moment from 'moment';
import { getReviews, addReviews } from 'api/products.api';
import style from './productdetails.module.scss';
import Icon from '../core/Icon';
import Loader from '../../assets/Loader';

export default function Reviews({ productId }) {
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  useEffect(() => {
    getReviews(productId).then(({ data }) => {
      setReviews(data);
      setLoading(false);
    });
  }, [productId]);

  const saveRating = async () => {
    if (!rating || !reviewText.trim()) {
      return Swal.fire({
        title: 'Error',
        text: 'Please select a rating and add a review',
        type: 'error',
        confirmButtonText: 'Ok'
      });
    }
    setSubmitting(true);
    const newComment = await addReviews(productId, {
      rating,
      review: reviewText
    });
    console.log(newComment);

    // to be completed after authentication
  };
  return (
    <div className={style.review}>
      <h2>Reviews</h2>

      <div className={style.header}>
        <div className={style.textarea}>
          <textarea
            onChange={e => setReviewText(e.target.value)}
            placeholder="Write a review"
            rows="5"
          />
        </div>
        <div className={style.rating}>
          <Rater
            onRate={({ rating }) => setRating(rating)}
            total={5}
            rating={rating}
          />
        </div>
        <div className={style.button}>
          <button
            className={isSubmitting ? 'button is-loading' : ''}
            onClick={saveRating}
          >
            Write a review
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className={style.isLoading}>
          <Loader />
        </div>
      ) : (
        <div className={style.reviews}>
          {reviews.map(review => {
            const year = moment(review.created_on).format('YYYY');
            const month = moment(review.created_on).format('MMM');
            const day = moment(review.created_on).format('DD');
            return (
              <article key={JSON.stringify(review)} className={style.review}>
                <div className={style.date}>
                  <span className={style.month}>{day}</span>
                  <div className={style.rest}>
                    <span className={style.day}>{month}</span>
                    <span className={style.year}>{year}</span>
                  </div>
                  <Icon className={style.arrow} icon={['fas', 'caret-right']} />
                </div>
                <div className={style.review__content}>
                  <div className={`small-icon ${style.review__content_rating}`}>
                    <h3>{review.name}</h3>
                    <Rater
                      total={5}
                      rating={review.rating}
                      interactive={false}
                    />
                  </div>
                  <p>{review.review}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
