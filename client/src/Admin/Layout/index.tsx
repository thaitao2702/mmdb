import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminSideMenu from './SideMenu';
import Logo from 'shared/svgs/Logo';
import './styles.scss';

const AdminLayout = () => {
  return (
    <>
      <div className="admin-header-menu">
        <div className="admin-header-logo flex-vertical-center">
          <Logo width={80} height={40} customStyle={{ marginLeft: '20px' }}></Logo>
        </div>
      </div>
      <AdminSideMenu />
      <div className="admin-content-ctn">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
