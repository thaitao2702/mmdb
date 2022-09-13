import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './styles.scss';

import MovieSlide from 'User/Home/MovieSlide';

import PageLoader from 'shared/components/PageLoader';
import { InlineIcon } from 'shared/components/Icon';

import { IMovieListExtraInfo } from 'User/Home';

export interface IMovieListSectionProps {
  title?: string;
  titleDescription?: string;
  isLoading: boolean;
  movies?: IMovieListExtraInfo;
}

const MovieListSection = ({
  titleDescription,
  title,
  isLoading,
  movies,
}: IMovieListSectionProps) => {
  const [displaySlide, setDisplaySlide] = useState(false);

  return (
    <div className="c-home-section">
      <div className="c-home-section__title">
        <a href="#" className="c-home-section__title-text">
          {title}
          <InlineIcon code="chevron-right ml-6"></InlineIcon>
        </a>
        {titleDescription && (
          <div className="c-home-section__title-description">{titleDescription}</div>
        )}
      </div>

      <CSSTransition
        in={displaySlide && movies && Object.keys(movies).length > 0}
        timeout={270}
        classNames="c-movie-slide"
        unmountOnExit
      >
        <MovieSlide slideData={movies as IMovieListExtraInfo}></MovieSlide>
      </CSSTransition>

      <CSSTransition
        in={isLoading}
        timeout={300}
        classNames="c-page-loader"
        onExited={() => setDisplaySlide(true)}
        unmountOnExit
      >
        <PageLoader></PageLoader>
      </CSSTransition>
    </div>
  );
};

export default MovieListSection;
