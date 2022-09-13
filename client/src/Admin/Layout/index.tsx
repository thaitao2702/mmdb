import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import './styles.scss';

import BtnWithSubMenu from 'shared/components/BtnWithSubMenu';
import AdminSideMenu from './SideMenu';
import Logo from 'shared/svgs/Logo';
import HeaderSearchInput from 'shared/components/HeaderSearchInput';
import { InlineIcon } from 'shared/components/Icon';
import { UserIcon } from 'shared/svgs';
import { UserRole } from 'shared/const';

import useToast from 'shared/hooks/toast';
import { getAuthData, resetAuthData } from 'shared/utils/auth';

const AdminLayout = () => {
  const auth = getAuthData();
  const isLogin = !!auth && !!auth.userId && !!auth.token;
  const userRole = auth?.userRole;
  const userName = auth?.name;
  const navigate = useNavigate();
  const toast = useToast();

  const logOut = (e: any) => {
    e.preventDefault();
    toast.success('You have been signed out');
    resetAuthData();
    window.location.reload();
  };

  useEffect(() => {
    if (!isLogin || userRole !== UserRole.Admin) {
      navigate('/');
    }
  }, []);

  return (
    <div className="l-admin">
      <div className="c-admin-header-menu">
        <div className="c-admin-header-logo flex-vertical-center">
          <Logo width={80} height={40} customStyle={{ marginLeft: '20px' }}></Logo>
        </div>
        <div className="c-admin-header-menu__search-ctn">
          <HeaderSearchInput placeHolderText="Search MMDb"></HeaderSearchInput>
        </div>
        <span style={{ flexGrow: 1 }}></span>
        <BtnWithSubMenu
          style={{ margin: '0 1rem' }}
          renderBtn={({ isOpenMenu, toggleMenu }) => (
            <div className="c-admin-header-profile-btn" onClick={toggleMenu}>
              <UserIcon className="c-menu-btn__icon mr-6"></UserIcon>
              {userName}
              <InlineIcon
                code={'caret-down'}
                className={`ml-3 flip ${isOpenMenu ? 'active' : ''}`}
              />
            </div>
          )}
          renderSubMenu={() => (
            <div className="c-main-menu__sub-menu-ctn">
              <div className="c-main-menu__sub-menu--light">
                <Link to="#" className="c-main-menu__sub-menu-item">
                  Your activity
                </Link>
                <Link to="#" className="c-main-menu__sub-menu-item" onClick={(e) => logOut(e)}>
                  Log out
                </Link>
              </div>
            </div>
          )}
        ></BtnWithSubMenu>
      </div>
      <AdminSideMenu />
      <div className="l-admin-content-ctn">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
