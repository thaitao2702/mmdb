import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CustomRouter from 'shared/components/CustomRouter';
import { history } from 'shared/history';
import Login from 'Auth/Login';
import Register from 'Auth/Register';
import Admin from 'Admin';
import AdminLayout from 'Admin/Layout';
import AddMovie from 'Admin/Movie/AddMovie';
import MovieList from 'Admin/Movie/MovieList';
import EditMovie from 'Admin/Movie/EditMovie';
import Movie from 'User/Movie';
import Home from 'User/Home';
import Layout from 'User/Layout';
import BeforeLoginLayout from 'Auth/Layout';
import ErrorPage from 'App/ErrorPage';

const Navigator = () => {
  return (
    <CustomRouter history={history}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="movies/new-movie" element={<AddMovie />} />
          <Route path="movies/edit-movie/:movieId" element={<EditMovie />} />
        </Route>
        <Route path="/auth" element={<BeforeLoginLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:movieId" element={<Movie />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </CustomRouter>
  );
};

export default Navigator;
