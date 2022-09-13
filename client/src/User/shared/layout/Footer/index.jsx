import React from 'react';
import './styles.scss';

import { Facebook, Youtube, Twitch, Twitter, Instagram } from 'shared/svgs/SocialNetworks';

const Footer = () => {
  return (
    <div className="c-footer">
      <div className="l-main-content-wrapper">
        <div className="c-footer__social-network-link-ctn flex-center">
          <a href="#" className="c-round-btn c-footer__social-network-link">
            <Facebook></Facebook>
          </a>
          <a href="#" className="c-round-btn c-footer__social-network-link">
            <Youtube></Youtube>
          </a>
          <a href="#" className="c-round-btn c-footer__social-network-link">
            <Twitch></Twitch>
          </a>
          <a href="#" className="c-round-btn c-footer__social-network-link">
            <Twitter></Twitter>
          </a>
          <a href="#" className="c-round-btn c-footer__social-network-link">
            <Instagram></Instagram>
          </a>
        </div>
        <div className="l-footer__row flex-center">
          <a href="#" className="c-footer__link underline-link">
            Get the IMDb App
          </a>
          <a href="#" className="c-footer__link underline-link">
            Help
          </a>
          <a href="#" className="c-footer__link underline-link">
            Site index
          </a>
          <a href="#" className="c-footer__link underline-link">
            IMDbPro
          </a>
          <a href="#" className="c-footer__link underline-link">
            Box Office Mojo
          </a>
          <a href="#" className="c-footer__link underline-link">
            IMDb Developer
          </a>
        </div>
        <div className="l-footer__row text-center">
          <a href="#" className="c-footer__link underline-link">
            Press Room
          </a>
          <a href="#" className="c-footer__link underline-link">
            Advertising
          </a>
          <a href="#" className="c-footer__link underline-link">
            Jobs
          </a>
          <a href="#" className="c-footer__link underline-link">
            Conditions of Use
          </a>
          <a href="#" className="c-footer__link underline-link">
            Privacy Policy
          </a>
          <a href="#" className="c-footer__link underline-link">
            Interest-Based Ads
          </a>
        </div>
        <div className="l-footer__row l-footer__row--copyright text-center">
          © 1990-2022 by IMDb.com, Inc.
        </div>
      </div>
    </div>
  );
};

export default Footer;
