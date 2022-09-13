import React from 'react';
import { Outlet } from 'react-router-dom';

import AdminSideMenu from './SideMenu';
import Logo from 'shared/svgs/Logo';
import './styles.scss';

const AdminLayout = () => {
  return (
    <div className="l-admin">
      <div className="c-admin-header-menu">
        <div className="c-admin-header-logo flex-vertical-center">
          <Logo width={80} height={40} customStyle={{ marginLeft: '20px' }}></Logo>
        </div>
      </div>
      <AdminSideMenu />
      <div className="l-admin-content-ctn">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
