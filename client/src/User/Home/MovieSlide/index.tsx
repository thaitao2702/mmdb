import React from 'react';

import Slide from 'shared/components/Slide';
import MovieInfo from 'User/Home/MovieInfo';

import { IMovieListExtraInfo } from 'User/Home';

interface ITopPickProps {
  slideData: IMovieListExtraInfo;
  isLoop?: boolean;
}

const MovieSlide = ({ slideData }: ITopPickProps) => {
  return (
    <div className="c-movie-slide">
      <Slide
        slideData={slideData}
        itemPerFrame={6}
        renderItem={(args) => <MovieInfo {...args}></MovieInfo>}
      ></Slide>
    </div>
  );
};

export default MovieSlide;
