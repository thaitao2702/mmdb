import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import './styles.scss';

import PageLoader from 'shared/components/PageLoader';
import MovieInfoRow from './MovieInfoRow';
import Pagination from 'shared/components/Pagination';

import { useApi } from 'shared/hooks/api';
import { ApiUrl } from 'shared/config/apiUrl';

import { IMovie } from 'shared/types/movie';

interface IMovieByPageResponse {
  success: boolean;
  data: IMovie[];
  count: number;
}

const MovieList = () => {
  const [{ loading }, getmovie] = useApi('post', ApiUrl.moviesByPage);
  const [movieList, setMovieList] = useState<IMovie[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const itemPerPage = 10;

  const handleMovies = (list: IMovie[]) => {
    return list.map((movie) => ({ ...movie, movieLink: '/admin/movies/edit-movie/' + movie.id }));
  };

  const onChangePage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const fetchMovies = async () => {
    try {
      const params = { itemPerPage, pageIndex: currentPage - 1 };
      const response = (await getmovie(params)) as IMovieByPageResponse;
      if (response.success) {
        setMovieList(handleMovies(response.data));
        setPageCount(Math.ceil(response.count / itemPerPage));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  return (
    <div className="c-admin-movie-list-ctn">
      <CSSTransition
        in={!loading && movieList && movieList.length > 0}
        timeout={270}
        classNames="c-admin-movie-list"
        unmountOnExit
      >
        <div className="c-admin-movie-list">
          {movieList?.map((movie) => (
            <MovieInfoRow key={movie.id} {...movie} variant="card"></MovieInfoRow>
          ))}
          {movieList && movieList.length && (
            <div className="c-admin-movie-list__pagination">
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={onChangePage}
              ></Pagination>
            </div>
          )}
        </div>
      </CSSTransition>
      <CSSTransition in={loading} timeout={270} classNames="c-page-loader" unmountOnExit>
        <PageLoader color="#2e2e2e"></PageLoader>
      </CSSTransition>
    </div>
  );
};

export default MovieList;
