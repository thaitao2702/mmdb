import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './styles.scss';

import { MenuIcon, AddToWatchListIcon, IMDbProIcon, Logo, UserIcon } from 'shared/svgs';
import { MenuBtn } from 'shared/components/Btn';
import SearchInput from 'shared/components/HeaderSearchInput';
import { InlineIcon } from 'shared/components/Icon';

import useToast from 'shared/hooks/toast';
import { getAuthData, resetAuthData } from 'shared/utils/auth';
import useOnOutside from 'shared/hooks/onOutSide';

interface IHeaderProps {
  watchListCount?: number;
}

const Header = ({ watchListCount }: IHeaderProps) => {
  const auth = getAuthData();
  const isLogin = !!auth && !!auth.userId && !!auth.token;
  const userName = auth?.name;
  const toast = useToast();
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
  const $userMenuRef = useRef<HTMLDivElement>(null);

  const closeUserMenu = () => setIsOpenUserMenu(false);

  const logOut = (e: any) => {
    e.preventDefault();
    toast.success('You have been signed out');
    resetAuthData();
    window.location.reload();
  };

  useOnOutside($userMenuRef, isOpenUserMenu, closeUserMenu);

  return (
    <>
      <header className="header">
        <div className="c-main-menu flex-vertical-center">
          <div className="c-main-menu__wrapper l-main-content-wrapper">
            <Link to="/" className="c-main-menu__item">
              <Logo customStyle={{ color: 'black' }}></Logo>
            </Link>
            <div className="c-main-menu__item">
              <MenuBtn className="c-menu-btn--hover-icon-lighter">
                <MenuIcon
                  customStyle={{ marginRight: '4px' }}
                  className="c-menu-btn__icon"
                ></MenuIcon>
                <div> Menu</div>
              </MenuBtn>
            </div>
            <div className="c-main-menu__item l-flex-grow--1">
              <SearchInput></SearchInput>
            </div>
            <div className="c-main-menu__item">
              <MenuBtn>
                <IMDbProIcon customStyle={{ marginRight: '4px' }}></IMDbProIcon>
              </MenuBtn>
            </div>
            <div className="c-vertical-divider"></div>
            <div className="c-main-menu__item">
              <MenuBtn className="c-menu-btn--hover-icon-lighter">
                <AddToWatchListIcon
                  customStyle={{ marginRight: '4px' }}
                  className="c-menu-btn__icon"
                ></AddToWatchListIcon>
                <div>
                  WatchList{' '}
                  {watchListCount ? (
                    <span className="c-main-menu__watchlist-btn-count">{watchListCount}</span>
                  ) : (
                    ''
                  )}
                </div>
              </MenuBtn>
            </div>
            <div className="c-main-menu__item" ref={$userMenuRef}>
              {isLogin ? (
                <MenuBtn
                  className="c-menu-btn--hover-icon-lighter"
                  onClick={() => setIsOpenUserMenu((prev) => !prev)}
                >
                  <UserIcon className="c-menu-btn__icon mr-6"></UserIcon>
                  {userName}
                  <InlineIcon
                    code={'caret-down'}
                    className={`ml-3 flip ${isOpenUserMenu ? 'active' : ''}`}
                  />
                  <CSSTransition
                    in={isOpenUserMenu}
                    timeout={300}
                    classNames="c-main-menu__sub-menu-ctn"
                    unmountOnExit
                  >
                    <div className="c-main-menu__sub-menu-ctn">
                      <div className="c-main-menu__sub-menu">
                        <Link to="#" className="c-main-menu__sub-menu-item">
                          Your activity
                        </Link>
                        <Link to="#" className="c-main-menu__sub-menu-item">
                          Your watchlist
                        </Link>
                        <Link to="#" className="c-main-menu__sub-menu-item">
                          Your rating
                        </Link>
                        <Link to="#" className="c-main-menu__sub-menu-item">
                          Your list
                        </Link>
                        <Link
                          to="#"
                          className="c-main-menu__sub-menu-item"
                          onClick={(e) => logOut(e)}
                        >
                          Log out
                        </Link>
                      </div>
                    </div>
                  </CSSTransition>
                </MenuBtn>
              ) : (
                <Link to="/auth/login">
                  <MenuBtn className="c-menu-btn--hover-icon-lighter">Login</MenuBtn>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
