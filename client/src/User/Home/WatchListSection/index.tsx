import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import './styles.scss';

import MovieListSection, { IMovieListSectionProps } from 'User/Home/MovieListSection';
import { MenuBtn, RibbonBtn } from 'shared/components/Btn';
import { InlineIcon, BtnIcon } from 'shared/components/Icon';
import PageLoader from 'shared/components/PageLoader';

interface IWatchListSection extends IMovieListSectionProps {
  isLogin: boolean;
}

const WatchListSection = ({ isLogin, ...rest }: IWatchListSection) => {
  const [displaySlide, setDisplaySlide] = useState(false);

  return (
    <>
      {isLogin ? (
        <MovieListSection {...rest}></MovieListSection>
      ) : (
        <div className="c-home-section c-home-section--empty">
          <div className="c-home-section__title">
            <a href="#" className="c-home-section__title-text">
              {rest.title}
              <InlineIcon code="chevron-right ml-6"></InlineIcon>
            </a>
          </div>

          <CSSTransition in={displaySlide} timeout={270} classNames="c-movie-slide" unmountOnExit>
            <div className="c-watchlist-message flex-center">
              <div className="l-row">
                <RibbonBtn width={32} height={45}>
                  <BtnIcon code="plus" _color="white" _fontSize="20px"></BtnIcon>
                </RibbonBtn>
              </div>
              <div className="l-row mt-20">
                <strong>Sign in to access your Watchlist</strong>
              </div>
              <div className="l-row">
                Save shows and movies to keep track of what you want to watch.
              </div>
              <div className="l-row mt-25">
                <Link to="/auth/login">
                  <MenuBtn className="c-menu-btn--sign-in">Sign in to MMDb</MenuBtn>
                </Link>
              </div>
            </div>
          </CSSTransition>

          <CSSTransition
            in={rest.isLoading}
            timeout={300}
            classNames="c-page-loader"
            onExited={() => setDisplaySlide(true)}
            unmountOnExit
          >
            <PageLoader></PageLoader>
          </CSSTransition>
        </div>
      )}
    </>
  );
};

export default WatchListSection;
