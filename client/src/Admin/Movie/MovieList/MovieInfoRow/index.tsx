import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

import { InlineIcon } from 'shared/components/Icon';

import { handleImageUrl, getRuntimeText, getYearFromDate } from 'shared/utils';

import { IMovie } from 'shared/types/movie';

interface IMovieListItemProps extends IMovie {
  movieLink?: string;
  variant?: 'card';
}

const MovieInfoRow = ({
  poster,
  title,
  releasedDate,
  runtime,
  movieCategory,
  rating,
  rate,
  actors,
  plot,
  movieLink,
  variant,
}: IMovieListItemProps) => {
  const releasedYear = getYearFromDate(releasedDate);
  const runtimeText = getRuntimeText(runtime);
  const posterUrl = handleImageUrl(poster);

  return (
    <div className={`c-movie-info-row ${variant ? 'c-movie-info-row--' + variant : ''}`}>
      <div className="c-movie-info-row__poster">
        <Link to={movieLink ? movieLink : '#'}>
          <img src={posterUrl}></img>
        </Link>
      </div>
      <div className="c-movie-info-row__info">
        <Link to={movieLink ? movieLink : '#'} className="c-movie-info-row__title underline-link">
          {title}
        </Link>
        <div className="c-movie-info-row__info-row2">
          {releasedYear && <span className="c-point-divider">{releasedYear}</span>}{' '}
          <span className="c-vertical-divider c-vertical-divider--grey"></span>
          {runtimeText && <span>{runtimeText}</span>}
          <span className="c-vertical-divider c-vertical-divider--grey"></span>
          {movieCategory && movieCategory.length > 0 && movieCategory.join(', ')}
        </div>
        <div className="c-movie-info-row__info-rating-row">
          {rating && (
            <>
              <InlineIcon code="star" className="rating-star mr-3"></InlineIcon>
              <span>{rating}</span>
            </>
          )}
          {rate && (
            <>
              <InlineIcon code="star" className="rating-star--blue mr-3"></InlineIcon>
              <span>{rate}</span>
            </>
          )}
        </div>
        {actors && actors.length > 0 && (
          <div className="c-movie-info-row__actors">
            {actors.slice(0, 3).map((actor) => (
              <a href="#" className="c-movie-info-row__actor underline-link" key={actor.actorId}>
                {actor.actor.name}
              </a>
            ))}
          </div>
        )}
        {plot && <div className="c-movie-info-row__plot">{plot}</div>}
      </div>
    </div>
  );
};

export default MovieInfoRow;
