import React, { useEffect, useState, useRef, useReducer } from 'react';
import { CSSTransition } from 'react-transition-group';

import './styles.scss';

import MainSlide from './MainSlide';
import MovieListSection from './MovieListSection';
import PageLoader from 'shared/components/PageLoader';
import ApiError from 'shared/components/ApiError';
import WatchListSection from './WatchListSection';

import { useApi } from 'shared/hooks/api';
import { ApiUrl } from 'shared/config/apiUrl';
import useToast from 'shared/hooks/toast';
import { handleImageUrl } from 'shared/utils';
import { MovieList } from 'shared/const';
import { MovieUpdatingContext } from 'shared/context';
import { reducer, IMoviesUpdatingState } from 'shared/reducer/homeMoviesList';
import { useUser } from 'User/Layout';

import { IUser } from 'User/Layout';

export interface ITrailer {
  screenShot: string;
  duration: string;
  id: number;
  info: string;
  name: string;
  poster: string;
}

export interface IDirector {
  id: number;
  name: string;
}

interface IActorRoleMovie {
  actor: any;
  id?: number;
  actorId: number | string;
  avatar: string;
  actorName: string;
  role?: string;
}

export interface IMovie {
  id: number;
  rating: number;
  title: string;
  poster: string;
  numberOfVotes: number;
  releasedDate: string;
  runtime: number;
  movieCategory: string[];
  plot: string;
  director: IDirector;
  writers: string[];
  actors: IActorRoleMovie[];
}

export interface IMovieExtraInfo extends IMovie {
  isOnWatchList: boolean;
  isLoading: boolean;
  rate: number;
}

export interface IMovieListExtraInfo {
  [movieIndex: number]: IMovieExtraInfo;
}

interface IDataResponse {
  success: boolean;
  data: {
    movies: { [K in MovieList]: IMovieList };
    trailers: ITrailer[];
  };
}

export interface IMovieList {
  [movieIndex: number]: IMovie;
}

const MovieListSectionMemo = React.memo(MovieListSection);
const WatchListSectionMemo = React.memo(WatchListSection);
const MainSlideMemo = React.memo(MainSlide);

const Home = () => {
  const { setWatchListCount, userData, isLogin } = useUser();
  const [watchList, setWatchList] = useState<IMovieListExtraInfo>();
  const [fanFavoriteList, setFanFavoriteList] = useState<IMovieListExtraInfo>();
  const [topPickList, setTopPickList] = useState<IMovieListExtraInfo>();
  const [trailers, setTrailers] = useState<ITrailer[]>();
  const $userDataRef = useRef<IUser>();
  const $isGetDataDone = useRef(false);
  const [{ error, loading: gettingData }, getData] = useApi('get', ApiUrl.homeData);
  const [isDisplayMainSLide, setIsDisplayMainSlide] = useState(false);

  const toast = useToast();

  const [movieUpdatingState, dispatch] = useReducer(reducer, {} as IMoviesUpdatingState);

  const handleUserData = (userData?: IUser) => {
    if (userData) {
      $userDataRef.current = userData;
      handleMovieList(setWatchList, userData[MovieList.WATCHLIST]);
      if ($isGetDataDone.current) {
        handleMovieList(setFanFavoriteList, undefined);
        handleMovieList(setTopPickList, undefined);
      }
    }
  };

  const handleMovieList = (
    movieListSetter: React.Dispatch<React.SetStateAction<IMovieListExtraInfo | undefined>>,
    data?: IMovieList,
  ) => {
    const userData = $userDataRef.current;
    const watchListArray = userData
      ? Object.keys(userData[MovieList.WATCHLIST]).map((id) => id)
      : [];
    movieListSetter((prevData) =>
      Object.entries(data ? data : prevData || {}).reduce((prev, [key, value]) => {
        prev[+key] = {
          ...value,
          poster: handleImageUrl(value.poster),
          rate:
            isLogin && userData
              ? userData.movieRatings[+key]
                ? userData.movieRatings[+key].rate
                : 0
              : 0,
          isLoading: isLogin ? (userData ? false : true) : false,
          isOnWatchList:
            isLogin && userData ? (watchListArray.indexOf(key) > -1 ? true : false) : false,
        };
        return prev;
      }, {} as IMovieListExtraInfo),
    );
  };

  const fetchData = async () => {
    try {
      const response = (await getData()) as IDataResponse;
      if (response.success) {
        handleMovieList(setFanFavoriteList, response.data.movies[MovieList.FANFAVORITES]);
        handleMovieList(setTopPickList, response.data.movies[MovieList.TOPPICK]);
        const processedData: ITrailer[] = response.data.trailers.map((trailer) => ({
          ...trailer,
          screenShot: handleImageUrl(trailer.screenShot),
          poster: handleImageUrl(trailer.poster),
        }));
        setTrailers(processedData);
        $isGetDataDone.current = true;
      }
      console.log('response', response);
    } catch (error) {
      if (error && error.message) toast.error(error.message);
      console.log('error', error);
    }
  };

  useEffect(() => {
    const initialWatchListCount = Object.keys(watchList || {}).length;
    const addedToWatchListCount = Object.values(movieUpdatingState).filter(
      (movie) => movie.isOnWatchList,
    ).length;
    setWatchListCount(initialWatchListCount + addedToWatchListCount);
  }, [movieUpdatingState, watchList]);

  useEffect(() => {
    handleUserData(userData);
  }, [userData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="l-main-content-wrapper">
      <CSSTransition
        in={isDisplayMainSLide && trailers && trailers.length > 0}
        timeout={270}
        classNames="l-main-slide-wrapper"
        unmountOnExit
      >
        <MainSlideMemo slideData={trailers as ITrailer[]} isAutoPlay={true}></MainSlideMemo>
      </CSSTransition>
      <CSSTransition
        in={gettingData}
        timeout={300}
        classNames="c-page-loader"
        onExited={() => setIsDisplayMainSlide(true)}
        unmountOnExit
      >
        <PageLoader></PageLoader>
      </CSSTransition>
      {error && !gettingData && <ApiError onRetry={fetchData}></ApiError>}
      <MovieUpdatingContext.Provider value={{ dispatch, updatingList: movieUpdatingState }}>
        <div className="c-home-group">
          <div className="c-home-group__heading">Featured today</div>
        </div>
        <div className="c-home-group">
          <div className="c-home-group__heading">What to watch</div>
          <MovieListSectionMemo
            title="Top picks"
            titleDescription="TV shows and movies just for you"
            isLoading={gettingData}
            movies={topPickList}
          ></MovieListSectionMemo>
          <WatchListSectionMemo
            isLogin={isLogin}
            title="From your Watchlist"
            titleDescription="Movies and TV shows that you have watchlisted"
            isLoading={gettingData}
            movies={watchList}
          ></WatchListSectionMemo>
          <MovieListSectionMemo
            title="Fan favorites"
            titleDescription="This week's top TV and movies"
            isLoading={gettingData}
            movies={fanFavoriteList}
          ></MovieListSectionMemo>
        </div>
      </MovieUpdatingContext.Provider>
    </div>
  );
};

export default Home;
