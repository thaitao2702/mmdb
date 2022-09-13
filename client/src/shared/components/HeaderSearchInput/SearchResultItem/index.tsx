import React from 'react';

import { DataType } from 'shared/const';
import { getYearFromDate } from 'shared/utils';

import './styles.scss';

import { ISearchDataMovieInfo, ISearchDataActorInfo } from 'shared/components/HeaderSearchInput';

type ISearchResultItemProps = ISearchDataMovieInfo | ISearchDataActorInfo;

const SearchResultItem = (props: ISearchResultItemProps) => {
  return (
    <>
      {props.dataType === DataType.ACTOR ? (
        <ActorSearchResult {...(props as ISearchDataActorInfo)}></ActorSearchResult>
      ) : (
        <MovieSearchResult {...(props as ISearchDataMovieInfo)}></MovieSearchResult>
      )}
    </>
  );
};

export default SearchResultItem;

type IActorSearchResultProps = ISearchDataActorInfo;

const ActorSearchResult = ({ name, avatar, mostPopularMovie }: IActorSearchResultProps) => {
  return (
    <div className="c-header-nav-search-result flex">
      <div className="c-header-nav-search-result__img">
        <img src={avatar}></img>
      </div>
      <div className="c-header-nav-search-result__info">
        {name && <div className="c-header-nav-search-result__title">{name}</div>}
        <div className="c-header-nav-search-result__metadata">
          <span>Actor</span>
          {mostPopularMovie && (
            <span className="c-header-nav-search-result__most-popular-movie">
              , {mostPopularMovie.title} ({getYearFromDate(mostPopularMovie.releasedDate)})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

type IMovieSearchResultProps = ISearchDataMovieInfo;

const MovieSearchResult = ({ title, poster, releasedDate, actors }: IMovieSearchResultProps) => {
  return (
    <div className="c-header-nav-search-result flex">
      <div className="c-header-nav-search-result__img">
        <img src={poster}></img>
      </div>
      <div className="c-header-nav-search-result__info">
        {title && <div className="c-header-nav-search-result__title">{title}</div>}
        {releasedDate && (
          <div className="c-header-nav-search-result__metadata">
            {getYearFromDate(releasedDate)}
          </div>
        )}
        {actors && actors.length > 0 && (
          <div className="c-header-nav-search-result__metadata">
            {actors.map((actor) => actor.name).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};
