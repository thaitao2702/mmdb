import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from 'User/shared/layout/Footer';
import Header from 'User/shared/layout/Header';

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
