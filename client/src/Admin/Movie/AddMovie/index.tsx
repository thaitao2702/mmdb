import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const { movieId } = useParams();
  const [{ loading }, createNewMovie] = useUploadApi('post', `${ApiUrl.movies}/${movieId}`);
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
      try {
        const response = (await createNewMovie(formData)) as IResponseCreateMovie;
        if (response.success) {
          toast.success('Update Movie Success');
          console.log('response ', response);
          setMovieData(response.data);
        }
      } catch (error) {
        if ('message' in error) toast.error((error as { message: string }).message);
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
        className="c-admin-btn--submit mr-9"
        disabled={isCreating}
        renderPrepend={isCreating && <Spinner size={25} color="white" className="mr-6"></Spinner>}
      >
        Create Movie
      </SubmitBtn>
    </div>
  );
};
