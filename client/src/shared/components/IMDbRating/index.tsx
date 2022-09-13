import React from 'react';

import { StarIcon, StarOIcon } from 'shared/svgs';

import './styles.scss';

interface IIMDbRatingProps {
  className?: string;
  rating?: number;
  voteCount?: number;
  variant?: 'dark' | 'light';
}

export const IMDbRating = ({
  rating = 0,
  voteCount = 0,
  variant = 'light',
  className = '',
}: IIMDbRatingProps) => {
  const milionCount = Math.floor(voteCount / 100000) / 10;
  const thousandCount = Math.floor(voteCount / 1000);
  const displayRating =
    milionCount >= 1 ? `${milionCount}M` : thousandCount ? `${thousandCount}K` : voteCount;
  return (
    <div className={`c-imdb-rating c-imdb-rating--${variant} ${className}`}>
      <div className="c-imdb-rating__title">IMDb RATING</div>
      <div className="c-imdb-rating__content flex">
        <div className="c-imdb-rating__star flex-vertical-center">
          <StarIcon size={32} customStyle={{ color: 'rgb(245, 197, 24)' }}></StarIcon>
        </div>
        <div className="c-imdb-rating__rating">
          <div className="c-imdb-rating__rating-ctn flex-vertical-center">
            <span className="c-imdb-rating__rating-value">{rating}</span>
            <span className="c-imdb-rating__rating-scale">/10</span>
          </div>
          <div className="c-imdb-rating__vote-count">{displayRating}</div>
        </div>
      </div>
    </div>
  );
};

interface IYourRatingProps {
  rate: number;
  variant?: 'dark' | 'light';
  onClick?: (...args: any[]) => any;
  className?: string;
}

export const YourRating = ({
  rate = 0,
  variant = 'dark',
  onClick = () => {},
  className = '',
}: IYourRatingProps) => {
  return (
    <div className={`c-imdb-rating c-imdb-rating--${variant} ${className}`}>
      <div className="c-imdb-rating__title">YOUR RATING</div>
      <div className="c-imdb-rating__content flex" onClick={onClick}>
        <div className="c-imdb-rating__star flex-vertical-center">
          {rate ? (
            <StarIcon size={32} customStyle={{ color: '#5799ef' }}></StarIcon>
          ) : (
            <StarOIcon size={32} customStyle={{ color: '#5799ef' }}></StarOIcon>
          )}
        </div>
        <div className="c-imdb-rating__rating flex-vertical-center">
          {rate ? (
            <div className="c-imdb-rating__rating-ctn flex-vertical-center">
              <span className="c-imdb-rating__rating-value">{rate}</span>
              <span className="c-imdb-rating__rating-scale">/10</span>
            </div>
          ) : (
            <div> Rate</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IMDbRating;
