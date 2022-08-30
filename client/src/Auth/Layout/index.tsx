import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import './styles.scss';
import Logo from 'shared/svgs/Logo';

const BeforeLoginLayout = () => {
    return (
        <>
            <div className="before-login-ctn">
                <div className="before-login-header">
                    <div className="before-login-logo-ctn content-ctn">
                        <Logo width={107} height={52} customStyle={{ margin: 'auto' }}></Logo>
                    </div>
                </div>
                <Outlet></Outlet>
                <div className="divider-inner mt-25"></div>
                <div className="before-login-footer">
                    <div className="footer-links content-ctn">
                        <NavLink to="#">
                            <span className="before-login-link">Help</span>
                        </NavLink>
                        <NavLink to="#">
                            <span className="before-login-link">Conditions of Use</span>
                        </NavLink>
                        <NavLink to="#">
                            <span className="before-login-link"> Privacy Notice </span>
                        </NavLink>
                    </div>
                    <div className="row content-ctn mt-10">
                        © 1996-2022, Amazon.com, Inc. or its affiliates
                    </div>
                </div>
            </div>
        </>
    )
}

export default BeforeLoginLayout;