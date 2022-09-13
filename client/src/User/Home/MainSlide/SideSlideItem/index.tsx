import React from 'react';

import './styles.scss';

import { ITrailer } from 'User/Home';

import { PlayIcon } from 'shared/svgs';

const SideSlideItem = ({ poster, duration, name, info }: ITrailer) => {
  return (
    <div className="c-side-slide-item">
      <div className="c-side-slide-item__img-ctn">
        <img src={poster} className="c-side-slide-item__img"></img>
      </div>
      <a href="#" className="c-side-slide-item__info">
        <div className="l-row">
          <PlayIcon
            className="c-side-slide-item__play-icon mr-9"
            size={32}
            displayBlock={false}
          ></PlayIcon>
          <span className="c-side-slide-item__duration">{duration}</span>
        </div>
        <div className="c-side-slide-item__name">{name}</div>
        <div className="c-side-slide-item__description">{info}</div>
      </a>
    </div>
  );
};

export default SideSlideItem;
