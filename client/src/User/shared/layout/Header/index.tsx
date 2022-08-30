import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';
import { MenuIcon, AddToWatchListIcon, IMDbProIcon, Logo } from 'shared/svgs';
import { MenuBtn } from 'User/shared/components/Btn';
import Modal from 'shared/components/Modal';
import SearchInput from './SearchInput';

const Header = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const toggleModal = () => { setModalOpen(prev => !prev) };
    return (
        <>
            <header className="header">
                <div className="main-menu">
                    <div className="main-menu-wrapper flex-vertical-center">
                        <NavLink to="/" className="header__item">
                            <Logo></Logo>
                        </NavLink>
                        <div className="header__item">
                            <MenuBtn className="menu-btn--hover-icon-lighter">
                                <MenuIcon customStyle={{ marginRight: '4px' }}></MenuIcon>
                                <div> Menu</div>
                            </MenuBtn>
                        </div>
                        <div className="header__item">
                            <MenuBtn className="menu-btn--hover-icon-lighter">
                                <AddToWatchListIcon customStyle={{ marginRight: '4px' }}></AddToWatchListIcon>
                                <div> WatchList</div>
                            </MenuBtn>
                        </div>
                        <div className="header__item">
                            <SearchInput></SearchInput>
                        </div>
                        <div className="header__item">
                            <MenuBtn>
                                <IMDbProIcon customStyle={{ marginRight: '4px' }}></IMDbProIcon>
                            </MenuBtn>
                        </div>
                        <div className="header__item">
                            <MenuBtn onClick = {toggleModal}>
                                Sign In
                            </MenuBtn>
                        </div>
                    </div>
                </div>
            </header>
            {isModalOpen && (<Modal/>)} 
        </>
    )
}

export default Header;