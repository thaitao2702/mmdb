import React from 'react';

import { StarIcon } from 'shared/svgs';

import './styles.scss';

interface IIMDbRatingProps {
  rating?: number;
  voteCount?: number;
}

export const IMDbRating = ({ rating = 0, voteCount = 0 }: IIMDbRatingProps) => {
  console.log('voteCount', voteCount);
  const milionCount = Math.floor(voteCount / 100000) / 10;
  const thousandCount = Math.floor(voteCount / 1000);
  const displayRating =
    milionCount >= 1 ? `${milionCount}M` : thousandCount ? `${thousandCount}K` : voteCount;
  return (
    <div className="c-imdb-rating">
      <div className="c-imdb-rating__title">IMDb RATING</div>
      <div className="c-imdb-rating__content flex">
        <div className="c-imdb-rating__star flex-vertical-center">
          <StarIcon size={40} customStyle={{ color: '#efd80b' }}></StarIcon>
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

export default IMDbRating;
