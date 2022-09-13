import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { IMDbRating, YourRating } from 'shared/components/IMDbRating';
import PageLoader from 'shared/components/PageLoader';
import ShareBtn from 'shared/svgs/ShareBtn';
import { MenuBtn, RibbonBtn } from 'shared/components/Btn';
import { BtnIcon } from 'shared/components/Icon';
import { PlayIcon, Videos, Photos } from 'shared/svgs';
import Heading from 'shared/components/Heading';
import Modal from 'shared/components/Modal';
import RatingModal from 'shared/components/RatingModal';

import { useApi } from 'shared/hooks/api';
import { ApiUrl } from 'shared/config/apiUrl';
import useToast from 'shared/hooks/toast';
import { useUser } from 'User/Layout';
import { handleImageUrl } from 'shared/utils';

import { IMovie, IMovieExtraInfo } from 'User/Home';

import './styles.scss';
import trailerImage from 'Assets/Images/trailer.jpg';

interface IGetMovieResponse {
  success: Boolean;
  data: IMovie;
}

const Movie = () => {
  const movieId = Number(useParams().movieId || 0);
  const {
    isLogin,
    loading: loadingUserData,
    userData,
    setWatchListCount: setMenuWatchListCount,
  } = useUser();
  const $userDataRef = useRef(userData);
  const [movieData, setMovieData] = useState<IMovieExtraInfo>();
  const {
    poster,
    title,
    rating,
    numberOfVotes,
    releasedDate,
    runtime,
    plot,
    director,
    writers,
    movieCategory,
    actors,
  } = movieData || {};
  const releasedYear = releasedDate ? new Date(releasedDate).getFullYear() : null;
  const [isOnWatchList, setIsOnWatchList] = useState(
    loadingUserData ? false : userData?.watchList[movieId] ? true : false,
  );
  const [rate, setRate] = useState(
    loadingUserData
      ? false
      : userData?.movieRatings[movieId]
      ? userData?.movieRatings[movieId].rate
      : 0,
  );

  const [, vote] = useApi('post', ApiUrl.vote);
  const [, unVote] = useApi('post', ApiUrl.unVote);
  const [{ loading: loadingMovieData }, getmovie] = useApi('get', `${ApiUrl.movies}/${movieId}`);
  const [{ loading: addingToWatchList }, addToWatchList] = useApi('post', ApiUrl.addToWatchList);
  const [{ loading: removingFromWatchList }, removeFromWatchList] = useApi(
    'post',
    ApiUrl.removeFromWatchList,
  );

  const [isOpenRatingModal, setIsOpenRatingModal] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const redirectToLogin = () => navigate('/auth/login');

  const onUnVote = async (movieId: number) => {
    const prevRate = rate;
    try {
      setRate(0);
      const params = { movieId };
      await unVote(params);
    } catch (error) {
      if (error && error.message) toast.error(error.message);
      setRate(prevRate);
    }
  };

  const onVote = async (movieId: number, rateValue: number) => {
    const prevRate = rate;
    try {
      setRate(rateValue);
      const params = { movieId, rate: rateValue };
      await vote(params);
    } catch (error) {
      if (error && error.message) toast.error(error.message);
      setRate(prevRate);
    }
  };

  const onAddToWatchList = async () => {
    try {
      const params = { movieId };
      await addToWatchList(params);
      setIsOnWatchList(true);
      setMenuWatchListCount((prev) => prev + 1);
    } catch (error) {
      if (error && error.message) toast.error(error.message);
    }
  };

  const onRemoveFromWatchList = async () => {
    try {
      const params = { movieId };
      await removeFromWatchList(params);
      setIsOnWatchList(false);
      setMenuWatchListCount((prev) => prev - 1);
    } catch (error) {
      if (error && error.message) toast.error(error.message);
    }
  };

  const handleRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    const hoursText = hours ? hours + 'h' : '';
    const minutesText = minutes ? minutes + 'm' : '';
    return hoursText + (hours ? ' ' : '') + minutesText;
  };
  const runtimeText = runtime ? handleRuntime(runtime) : null;

  const handleMovieData = (data?: IMovie): IMovieExtraInfo | undefined => {
    if (!data) return undefined;
    const userDataRefVal = $userDataRef.current;
    return {
      ...data,
      poster: handleImageUrl(data.poster),
      actors: data.actors.map((actor) => ({
        ...actor,
        avatar: handleImageUrl(actor.actor.avatar),
      })),
      rate: userDataRefVal
        ? userDataRefVal.movieRatings[movieId]
          ? userDataRefVal.movieRatings[movieId].rate
          : 0
        : 0,
      isLoading: false,
      isOnWatchList: userDataRefVal ? (userDataRefVal.watchList[movieId] ? true : false) : false,
    };
  };

  useEffect(() => {
    $userDataRef.current = userData;
    if (userData) {
      setMovieData((prev) => handleMovieData(prev));
      setIsOnWatchList(userData.watchList[movieId] ? true : false);
      setRate(userData.movieRatings[movieId] ? userData.movieRatings[movieId].rate : 0);
    }
  }, [userData]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = (await getmovie()) as IGetMovieResponse;
        if (response.success) {
          console.log('movie data', response.data);
          setMovieData(handleMovieData(response.data));
        }
      } catch (error) {
        if (error && error.message) toast.error(error.message);
      }
    };
    fetchMovie();
  }, []);

  return (
    <div className="l-block">
      {loadingMovieData && <PageLoader></PageLoader>}
      {!loadingMovieData && movieData && (
        <div className="c-user-movie-full">
          <div className="c-user-movie-full__overview">
            <div className="l-main-content-wrapper l-user-movie-full-cw">
              <div className="c-user-movie-full__link-list-row">
                <ul className="c-user-movie-full__link-group mr-12">
                  <li className="c-point-divider">
                    <a className="underline-link" href="#">
                      Cast & crew
                    </a>
                  </li>
                  <li className="c-point-divider">
                    <a className="underline-link" href="#">
                      User reviews
                    </a>
                  </li>
                  <li className="c-point-divider">
                    <a className="underline-link" href="#">
                      Trivia
                    </a>
                  </li>
                </ul>
                <div className="c-user-movie-full__link-group">
                  <a className="underline-link" href="#" style={{ padding: '0 1rem' }}>
                    IMDbPro
                  </a>
                </div>
                <div className="c-user-movie-full__link-group">
                  <MenuBtn>All topics</MenuBtn>
                </div>
                <div className="c-user-movie-full__link-group">
                  <a href="#" className="c-round-btn">
                    <ShareBtn></ShareBtn>
                  </a>
                </div>
              </div>
              <div className="flex" style={{ justifyContent: 'space-between' }}>
                <div className="l-left-block">
                  <h1 className="c-user-movie-full__movie-title">{title}</h1>
                  <div className="c-user-movie-full__year-runtime flex">
                    {releasedYear && <div className="c-point-divider">{releasedYear}</div>}
                    {runtimeText && <div className="c-point-divider">{runtimeText}</div>}
                  </div>
                </div>
                <div className="l-right-block flex" style={{ alignItems: 'flex-end' }}>
                  <div className="flex">
                    <IMDbRating
                      rating={rating}
                      voteCount={numberOfVotes}
                      variant="dark"
                    ></IMDbRating>
                    <YourRating
                      rate={rate || 0}
                      className="ml-18"
                      onClick={() => setIsOpenRatingModal(true)}
                    ></YourRating>
                  </div>
                </div>
              </div>
              <div className="c-user-movie-full__media mt-15 flex">
                <div className="c-user-movie-full__poster">
                  <img className="c-user-movie-full__poster-img" src={poster}></img>
                  <div className="c-user-movie-full__poster-ribbon-btn">
                    {isOnWatchList ? (
                      <div className="c-movie-info-card__add-btn">
                        <RibbonBtn
                          ribbonClassName="ribbon--yellow"
                          width={32}
                          height={45}
                          onClick={isLogin ? onRemoveFromWatchList : redirectToLogin}
                          loading={removingFromWatchList || loadingUserData}
                        >
                          <BtnIcon code="check-1" _color="black" _fontSize="20px"></BtnIcon>
                        </RibbonBtn>
                      </div>
                    ) : (
                      <div className="c-movie-info-card__add-btn">
                        <RibbonBtn
                          width={32}
                          height={45}
                          onClick={isLogin ? onAddToWatchList : redirectToLogin}
                          loading={addingToWatchList || loadingUserData}
                          spinnerColor={isOnWatchList ? 'black' : 'white'}
                        >
                          <BtnIcon code="plus" _color="white" _fontSize="20px"></BtnIcon>
                        </RibbonBtn>
                      </div>
                    )}
                  </div>
                </div>
                <div className="c-user-movie-full__trailer">
                  <img className="c-user-movie-full__trailer-img" src={trailerImage}></img>
                  <div className="c-user-movie-full__trailer-control">
                    <PlayIcon size={60} className="c-user-movie-full__trailer-play-icon"></PlayIcon>
                    <div className="l-row">
                      <span className="c-user-movie-full__trailer-text">Play trailer</span>{' '}
                      <span className="c-user-movie-full__trailer-duration">2:20</span>
                    </div>
                  </div>
                  <div className="c-user-movie-full__trailer-gradient-effect"></div>
                </div>
                <div className="c-user-movie-full__gallery">
                  <a href="#" className="c-user-movie-full__gallery-videos">
                    <Videos size={32} customStyle={{ fill: 'white' }}></Videos>
                    <div className="l-row mt-10">4 VIDEOS</div>
                  </a>
                  <a href="#" className="c-user-movie-full__gallery-photos">
                    <Photos size={32} customStyle={{ fill: 'white' }}></Photos>
                    <div className="l-row mt-10">56 PHOTOS</div>
                  </a>
                </div>
              </div>
              <div className="l-block mt-15 flex">
                <div className="l-overview-left-block">
                  <div className="c-user-movie-full__category">
                    {movieCategory?.map((category) => (
                      <div className="c-category-btn" key={category}>
                        {category}
                      </div>
                    ))}
                  </div>
                  {plot && <div className="c-user-movie-full__plot">{plot}</div>}
                  {director && (
                    <div className="c-user-movie-full__director">
                      <span className="c-user-movie-full__director-title">Director</span>
                      <a href="#" className="underline-link underline-link--blue">
                        {director.name}
                      </a>
                    </div>
                  )}
                  {writers && writers.length > 0 && (
                    <div className="c-user-movie-full__writers">
                      <span className="c-user-movie-full__writers-title">
                        {writers.length === 0 ? 'Writer' : 'Writers'}
                      </span>
                      {writers.map((writer) => (
                        <a
                          key={writer}
                          href="#"
                          className="c-point-divider underline-link underline-link--blue"
                        >
                          {writer}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="l-overview-right-block"></div>
              </div>
            </div>
          </div>
          <div className="l-white-section" style={{ padding: '2rem 0' }}>
            <div className="l-main-content-wrapper l-user-movie-full-cw">
              <Heading text="Top cast" to="#" variant={['light', 'big']}></Heading>
              <div className="c-user-movie-full__cast">
                {actors &&
                  actors.length > 0 &&
                  actors.map((actor) => (
                    <div className="c-user-movie-full__actor" key={actor.id}>
                      <a href="#" className="c-user-movie-full__actor-avatar">
                        <img src={actor.avatar}></img>
                      </a>
                      <div className="c-user-movie-full__actor-info">
                        <a href="#" className="c-user-movie-full__actor-name">
                          {actor.actorName}
                        </a>
                        <a href="#" className="c-user-movie-full__actor-role underline-link">
                          {actor.role}
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={isOpenRatingModal}
        onClose={() => setIsOpenRatingModal(false)}
        renderContent={() => (
          <RatingModal
            movieId={movieId}
            movieName={title || ''}
            onRate={isLogin ? onVote : redirectToLogin}
            onUnrate={isLogin ? onUnVote : redirectToLogin}
            rate={rate || 0}
            onClose={() => setIsOpenRatingModal(false)}
          ></RatingModal>
        )}
      ></Modal>
    </div>
  );
};

export default Movie;
