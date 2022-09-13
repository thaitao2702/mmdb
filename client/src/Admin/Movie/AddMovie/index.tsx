import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MovieDetail, { IMovieData, defaultMovieData } from 'admin/Movie/MovieDetail';
import { SubmitBtn } from 'shared/components/Btn';
import Spinner from 'shared/components/Spinner';

import { useUploadApi } from 'shared/hooks/api';
import { ApiUrl } from 'shared/config/apiUrl';
import useToast from 'shared/hooks/toast';

interface IResponseCreateMovie {
  success: boolean;
  data: IMovieData;
}

const AddMovie = () => {
  const [movieData, setMovieData] = useState<IMovieData>(defaultMovieData);
  console.log(movieData);
  const [{ loading }, createNewMovie] = useUploadApi('post', `${ApiUrl.movies}`);
  const toast = useToast();
  const navigate = useNavigate();

  const submit = async () => {
    if (movieData) {
      let formData = new FormData();
      Object.keys(movieData).forEach((key) => {
        const data = JSON.stringify((movieData as { [key: string]: any })[key]);
        formData.append(key, data);
      });
      if (movieData['uploadImage']) formData.append('image', movieData.uploadImage);
      try {
        const response = (await createNewMovie(formData)) as IResponseCreateMovie;
        if (response.success) {
          const movieId = response.data.id;
          toast.success('Create Movie Success');
          navigate('/admin/movie/edit-movie/' + movieId);
        }
      } catch (error) {
        if (error && error.message) toast.error(error.message);
        console.log('err', error);
      }
    }
  };

  return (
    <MovieDetail
      setMovieData={setMovieData}
      movie={movieData}
      renderControlBtns={<BtnsBlock onSubmit={submit} isCreating={loading}></BtnsBlock>}
    ></MovieDetail>
  );
};

export default AddMovie;

interface IBtnsBlock {
  onSubmit: (...args: any[]) => any;
  isCreating: boolean;
}

const BtnsBlock = ({ onSubmit, isCreating }: IBtnsBlock) => {
  return (
    <div className="l-control-btn-ctn">
      <SubmitBtn
        onClick={onSubmit}
        className="c-admin-btn--submit"
        disabled={isCreating}
        renderPrepend={isCreating && <Spinner size={25} color="white" className="mr-6"></Spinner>}
      >
        Create Movie
      </SubmitBtn>
    </div>
  );
};
