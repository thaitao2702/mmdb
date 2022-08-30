import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from 'Auth/Login';
import Register from 'Auth/Register';
import Admin from 'Admin';
import AdminLayout from 'Admin/Layout';
import AddMovie from 'Admin/Movie/AddMovie';
import EditMovie from 'Admin/Movie/EditMovie';
import Movie from 'User/Movie';
import Home from 'User/Home';
import Layout from 'User/shared/layout';
import BeforeLoginLayout from 'Auth/Layout';

const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="/admin/movie/new-movie" element={<AddMovie />} />
          <Route path="/admin/movie/edit-movie/:movieId" element={<EditMovie />} />
        </Route>
        <Route path="/auth" element={<BeforeLoginLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movie/:movieId" element={<Movie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
