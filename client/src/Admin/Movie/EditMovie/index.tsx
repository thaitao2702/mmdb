import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';

import MovieDetail, { IMovieData } from 'admin/Movie/MovieDetail';
import PageLoader from 'shared/components/PageLoader';
import { SubmitBtn } from 'shared/components/Btn';
import Spinner from 'shared/components/Spinner';

import { ApiUrl } from 'shared/config/apiUrl';
import { useApi, useUploadApi } from 'shared/hooks/api';
import { handleImageUrl } from 'shared/utils';
import useToast from 'shared/hooks/toast';

import { IActorRoleMovie } from 'Admin/Movie/MovieDetail/ActorsList/ActorListItem';

export interface IResponse {
  success: boolean;
  data: IResponseMovieData;
}

export interface IResponseMovieData {
  [key: string]: any;
  id: string | number;
  actors: IResponseActorData[];
  title: string;
  plot: string;
  poster: string;
  writers: string[];
  movieCategory: string[];
  director: IResponseDirectorData;
  rating: number;
  numberOfVotes: number;
  releasedDate: string;
}

export interface IResponseUpdateMovie {
  success: boolean;
  data: IMovieData;
}

export interface IResponseActorData {
  [key: string]: any;
  actorName: string;
  actorId: string | number;
  movieId: string | number;
  role: string;
  actor: { [key: string]: any; avatar: string };
}

export interface IResponseDirectorData {
  [key: string]: any;
  avatar: string;
  id: string | number;
  name: string;
}

interface IMovieDataPayload extends IMovieData {
  uploadImage?: any;
}

const handleActor = (data: IResponseActorData): IActorRoleMovie => ({
  id: data.id,
  actorId: data.actorId,
  actorName: data.actorName,
  movieId: data.movieId,
  role: data.role,
  movieTitle: data.movieTitle,
  avatar: handleImageUrl(data.actor.avatar),
});

const handleMovieData = (data: IResponseMovieData): IMovieData => ({
  ...data,
  actors: data.actors.map((actor) => handleActor(actor)),
});

const EditMovie = () => {
  const [movieData, setMovieData] = useState<IMovieDataPayload>({} as IMovieData);
  console.log(movieData);
  const { movieId } = useParams();
  const [{ loading: isLoadingMovie }, getMovie] = useApi('get', `${ApiUrl.movies}/${movieId}`);
  const [{ loading: isUpdatingMovie }, updateMovie] = useUploadApi(
    'put',
    `${ApiUrl.movies}/${movieId}`,
  );
  const toast = useToast();

  const submit = async () => {
    if (movieData) {
      console.log('movie data', movieData);

      let formData = new FormData();
      Object.keys(movieData).forEach((key) => {
        const data = JSON.stringify((movieData as { [key: string]: any })[key]);
        formData.append(key, data);
      });
      if (movieData['uploadImage']) formData.append('image', movieData.uploadImage);
      const response = (await updateMovie(formData)) as IResponseUpdateMovie;
      toast.success('Update Movie Success');
      console.log('response ', response);
      setMovieData(response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        const response = (await getMovie({ id: movieId })) as IResponse;
        if (response.success) {
          console.log('data ', response.data);
          const processData = handleMovieData(response.data);
          setMovieData(processData);
        }
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <Fragment>
      {isLoadingMovie ? (
        <PageLoader></PageLoader>
      ) : (
        <MovieDetail
          movie={movieData as IMovieData}
          setMovieData={setMovieData}
          renderControlBtns={
            <BtnsBlock
              onSave={submit}
              onDelete={submit}
              isSaving={isUpdatingMovie}
              isDeleteing={isUpdatingMovie}
            ></BtnsBlock>
          }
        ></MovieDetail>
      )}
    </Fragment>
  );
};

export default EditMovie;

interface IBtnsBlock {
  onSave: (...args: any[]) => any;
  onDelete: (...args: any[]) => any;
  isSaving: boolean;
  isDeleteing: boolean;
}

const BtnsBlock = ({ onSave, isSaving, onDelete, isDeleteing }: IBtnsBlock) => {
  return (
    <div className="l-control-btn-ctn">
      <SubmitBtn
        onClick={onSave}
        className="c-admin-btn--submit mr-9"
        disabled={isSaving}
        renderPrepend={isSaving && <Spinner size={25} color="white" className="mr-6"></Spinner>}
      >
        Update
      </SubmitBtn>
      <SubmitBtn className="c-admin-btn--delete" onClick={onDelete} disabled={isDeleteing}>
        Delete
      </SubmitBtn>
    </div>
  );
};
