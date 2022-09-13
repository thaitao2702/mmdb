import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles.scss';

import { InlineIcon, BtnIcon } from 'shared/components/Icon';
import { MenuBtn, RibbonBtn } from 'shared/components/Btn';
import Modal from 'shared/components/Modal';
import RatingModal from '../../../shared/components/RatingModal';
import Spinner from 'shared/components/Spinner';
import { useHomeContext } from 'shared/context';
import { useApi } from 'shared/hooks/api';
import { ApiUrl } from 'shared/config/apiUrl';
import useToast from 'shared/hooks/toast';
import { getAuthData } from 'shared/utils/auth';

import { IMovieExtraInfo } from 'User/Home';

interface IMovieInfoProps {
  data: IMovieExtraInfo;
  dispatch: React.Dispatch<any>;
}

const MovieInfoWrapper = (props: IMovieExtraInfo) => {
  const { id } = props;
  const { updatingList, dispatch } = useHomeContext();
  const isMovieInfoChange = !!updatingList[id];
  const movieProps = isMovieInfoChange ? { ...props, ...updatingList[id] } : props;
  return <MovieInfoMemo data={movieProps} dispatch={dispatch}></MovieInfoMemo>;
};

const MovieInfo = ({ data, dispatch }: IMovieInfoProps) => {
  const auth = getAuthData();
  const isLogin = !!auth && !!auth.userId && !!auth.token;
  const { poster, title, rating, rate, isOnWatchList, isLoading, id } = data;
  const [, vote] = useApi('post', ApiUrl.vote);
  const [, unVote] = useApi('post', ApiUrl.unVote);
  const [, addToWatchList] = useApi('post', ApiUrl.addToWatchList);
  const [, removeFromWatchList] = useApi('post', ApiUrl.removeFromWatchList);
  const toast = useToast();
  const navigate = useNavigate();

  const navigateToLogin = () => navigate('/auth/login');

  const dispatchUpdating = (updateData: { [key: string]: any }) => {
    dispatch({
      type: 'UpdateMovie',
      payload: {
        id,
        ...updateData,
      },
    });
  };

  const dispatchUpdateDone = (finalData: { [key: string]: any }) => {
    dispatch({
      type: 'UpdateDone',
      payload: {
        id,
        ...finalData,
      },
    });
  };

  const onVote = async (movieId: number, rate: number, prevRate?: number) => {
    try {
      dispatchUpdateDone({ rate });
      const params = { movieId, rate };
      await vote(params);
    } catch (error) {
      if (error && error.message) toast.error(error.message);
      dispatchUpdateDone({ rate: prevRate || 0 });
    }
  };

  const onUnVote = async (movieId: number) => {
    try {
      dispatchUpdateDone({ rate: 0 });
      const params = { movieId };
      await unVote(params);
    } catch (error) {
      if (error && error.message) toast.error(error.message);
    }
  };

  const onAddToWatchList = async () => {
    try {
      dispatchUpdating({ isLoading: true, isOnWatchList: true });
      const params = { movieId: id };
      await addToWatchList(params);
      dispatchUpdateDone({ isOnWatchList: true });
    } catch (error) {
      if (error && error.message) toast.error(error.message);
      dispatchUpdateDone({ isOnWatchList: false });
    }
  };

  const onRemoveFromWatchList = async () => {
    try {
      dispatchUpdating({ isLoading: true, isOnWatchList: false });
      const params = { movieId: id };
      await removeFromWatchList(params);
      dispatchUpdateDone({ isOnWatchList: false });
    } catch (error) {
      if (error && error.message) toast.error(error.message);
      dispatchUpdating({ isLoading: false, isOnWatchList: true });
      dispatchUpdateDone({ isOnWatchList: true });
    }
  };

  return (
    <div className="c-movie-info-card">
      <div className="c-movie-info-card__content">
        {isOnWatchList ? (
          <div className="c-movie-info-card__add-btn">
            <RibbonBtn
              ribbonClassName="ribbon--yellow"
              width={32}
              height={45}
              onClick={isLogin ? onRemoveFromWatchList : navigateToLogin}
              loading={isLoading}
            >
              <BtnIcon code="check-1" _color="black" _fontSize="20px"></BtnIcon>
            </RibbonBtn>
          </div>
        ) : (
          <div className="c-movie-info-card__add-btn">
            <RibbonBtn
              width={32}
              height={45}
              onClick={isLogin ? onAddToWatchList : navigateToLogin}
              loading={isLoading}
              spinnerColor={isOnWatchList ? 'black' : 'white'}
            >
              <BtnIcon code="plus" _color="white" _fontSize="20px"></BtnIcon>
            </RibbonBtn>
          </div>
        )}
        <Link to={`/movie/${id}`} className="c-movie-info-card__img-ctn">
          <img className="c-movie-info-card__img" src={poster}></img>
        </Link>
        <div className="c-movie-info-card__info-ctn">
          <div className="c-movie-info-card__rating-ctn flex-vertical-center">
            <InlineIcon code="star" _color="#f5c518"></InlineIcon>
            <span className="c-movie-info-card__rating ml-6">{rating}</span>
            <Modal
              renderLink={(modal) => (
                <MenuBtn
                  className="c-movie-info-card__rate-btn c-menu-btn--hover-icon-lighter"
                  onClick={modal.onOpen}
                >
                  {rate ? (
                    <>
                      <InlineIcon code="star"></InlineIcon>
                      <span className="c-movie-info-card__rated-number ml-6">{rate}</span>
                    </>
                  ) : (
                    <InlineIcon code="star-o"></InlineIcon>
                  )}
                </MenuBtn>
              )}
              renderContent={({ onClose }) => (
                <RatingModal
                  movieName={title}
                  movieId={id}
                  rate={rate}
                  onRate={isLogin ? onVote : navigateToLogin}
                  onUnrate={isLogin ? onUnVote : navigateToLogin}
                  onClose={onClose}
                ></RatingModal>
              )}
            ></Modal>
          </div>
          <Link to={`/movie/${id}`} className="c-movie-info-card__title underline-link">
            {title}
          </Link>
          <div className="c-movie-info-card__action mt-15">
            <MenuBtn
              className="c-menu-btn--light-grey c-menu-btn--full-width c-menu-btn--color-blue"
              onClick={
                isLogin
                  ? isOnWatchList
                    ? onRemoveFromWatchList
                    : onAddToWatchList
                  : navigateToLogin
              }
            >
              {isLoading ? (
                <Spinner className="c-btn-icon" color="#5799ef" size={26}></Spinner>
              ) : (
                <>
                  {isOnWatchList ? (
                    <InlineIcon code="check-1" _fontSize="18px" _top="-1px"></InlineIcon>
                  ) : (
                    <InlineIcon code="plus" _fontSize="18px" _top="-1px"></InlineIcon>
                  )}
                  <span className="ml-6">Watchlist</span>
                </>
              )}
            </MenuBtn>
            <MenuBtn className="mt-10 c-menu-btn--hover-icon-lighter">
              <InlineIcon
                code="play-2"
                className="c-menu-btn__icon"
                _fontSize="18px"
                _top="-1px"
              ></InlineIcon>
              <span className="ml-6">Trailer</span>
            </MenuBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieInfoMemo = React.memo(MovieInfo);

export default MovieInfoWrapper;
