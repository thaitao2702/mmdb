import React, { useRef, useLayoutEffect } from 'react';

import './styles.scss';
import TextArea from 'shared/components/TextArea';
import AddPoster from './AddPoster';
import SelectWithSearch from 'shared/components/SelectWithSearch';
import SelectDirector from './SelectDirector';
import SelectGenre from './SelectGenre';
import ActorList from './ActorsList';
import IMDbRating from 'shared/components/IMDbRating';
import SelectReleaseDate from './SelectReleaseDate';

import { IActorRoleMovie } from 'Admin/Movie/MovieDetail/ActorsList/ActorListItem';
import { IDirector } from 'Admin/Movie/MovieDetail/SelectDirector';
import { handleImageUrl } from 'shared/utils';

export interface IMovieData {
  [key: string]: any;
  id?: string | number;
  actors: IActorRoleMovie[];
  title: string;
  plot: string;
  poster: string;
  writers: string[];
  movieCategory: string[];
  director: IDirector | null;
  rating?: number;
  numberOfVotes?: number;
  releasedDate: string | Date;
}

type IMovieDetailProps = {
  movie: IMovieData;
  renderControlBtns: JSX.Element;
  setMovieData: setMovieDataFunc;
};

type setMovieDataFunc = React.Dispatch<React.SetStateAction<IMovieData>>;

export const defaultMovieData = {
  id: '',
  actors: [] as IActorRoleMovie[],
  title: '',
  plot: '',
  poster: '',
  writers: [] as string[],
  movieCategory: [] as string[],
  director: null,
  rating: undefined,
  numberOfVotes: undefined,
  releasedDate: '',
};

const MovieDetail = ({ movie, setMovieData, renderControlBtns }: IMovieDetailProps) => {
  const $movieTitleRef = useRef<HTMLTextAreaElement>(null);
  const $moviePlotRef = useRef<HTMLTextAreaElement>(null);
  const {
    id,
    title,
    plot,
    writers,
    movieCategory,
    actors,
    director,
    rating,
    numberOfVotes,
    poster,
    releasedDate,
  } = movie;
  const selectedWriters = writers?.map((writer) => ({ name: writer, id: writer }));
  const category = movieCategory?.map((category) => ({ name: category, id: category }));

  const updateMovieTitle = (value: string) => {
    setMovieData((prev) => ({
      ...prev,
      title: value,
      actors: actors?.map((actor) => ({ ...actor, movieTitle: value } || [])),
    }));
  };
  const updateMoviePlot = (value: string) => {
    setMovieData((prev) => ({ ...prev, plot: value }));
  };

  const updateWriterList = (newList: { name: string; id: number | string }[]) => {
    setMovieData((prev) => ({ ...prev, writers: newList.map((writer) => writer.name) }));
  };

  const updateDirector = (director: IDirector[]) => {
    setMovieData((prev) => ({ ...prev, director: director[0] || null }));
  };

  const updateGenre = (movieCategory: { name: string; id: number | string }[]) => {
    setMovieData((prev) => ({
      ...prev,
      movieCategory: movieCategory.map((category) => category.name),
    }));
  };

  const updateActorList = (newList: IActorRoleMovie[]) => {
    setMovieData((prev) => ({ ...prev, actors: newList }));
  };

  const updatePoster = (uploadImage: any) => {
    setMovieData((prev) => ({ ...prev, uploadImage, poster: uploadImage ? prev.poster : '' }));
  };

  const updateReleaseDate = (date: string | Date) => {
    setMovieData((prev) => ({ ...prev, releasedDate: date }));
  };

  useLayoutEffect(() => {
    if ($movieTitleRef.current) $movieTitleRef.current.value = title || '';
  }, [title]);

  useLayoutEffect(() => {
    if ($moviePlotRef.current) $moviePlotRef.current.value = plot || '';
  }, [plot]);

  return (
    <div className="c-movie-detail">
      <div className="c-movie-detail__movie-summarize">
        <div className="l-row l-row--movie-summarize">
          <TextArea
            onChange={updateMovieTitle}
            ref={$movieTitleRef}
            placeholder="Movie Title"
          ></TextArea>
          {rating && numberOfVotes && (
            <IMDbRating rating={rating} voteCount={numberOfVotes}></IMDbRating>
          )}
        </div>
        <div className="l-row flex mt-5">
          <div className="l-left-area">
            <div className="c-movie-detail__movie-poster">
              <AddPoster
                imageUrl={handleImageUrl(poster || '')}
                onChange={updatePoster}
              ></AddPoster>
            </div>
          </div>
          <div className="l-right-area">
            <div className="l-row">
              <TextArea
                onChange={updateMoviePlot}
                ref={$moviePlotRef}
                minRows={2}
                placeholder="Story Summarize"
                _fontSize="16px"
              ></TextArea>
            </div>
            <div className="l-row">
              <SelectDirector
                selectedList={director ? [director] : []}
                onChange={updateDirector}
              ></SelectDirector>
            </div>
            <div className="l-row">
              <SelectWithSearch
                optionsList={writerList}
                selectedList={selectedWriters}
                onChange={updateWriterList}
                title="Writers"
              ></SelectWithSearch>
            </div>
            <div className="l-row">
              <SelectGenre selectedList={category || []} onChange={updateGenre}></SelectGenre>
            </div>
            <div className="l-row">
              <SelectReleaseDate
                date={releasedDate}
                onChange={updateReleaseDate}
              ></SelectReleaseDate>
            </div>
          </div>
        </div>
      </div>
      <ActorList
        actors={actors}
        movieTitle={title || ''}
        onChange={updateActorList}
        movieId={id || ''}
      ></ActorList>

      <div className="c-movie-detail__control-btn-ctn">{renderControlBtns}</div>
    </div>
  );
};

const writerList = [
  { name: 'Thai Tao', id: 'Thai Tao' },
  { name: 'Saul Goodman', id: 'Saul Goodman' },
  { name: 'Quan Dang', id: 'Quan Dang' },
  { name: 'Trong Dat', id: 'Trong Dat' },
];

export default MovieDetail;
