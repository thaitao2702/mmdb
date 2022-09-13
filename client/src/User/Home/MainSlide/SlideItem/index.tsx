import React from 'react';

import './styles.scss';

import { ITrailer } from 'User/Home';

import { RibbonBtn } from 'shared/components/Btn';
import { BtnIcon } from 'shared/components/Icon';
import { PlayIcon } from 'shared/svgs';

interface ISlideItem extends ITrailer {
  position?: string;
}

const SlideItem = ({ screenShot, position, poster, duration, name, info }: ISlideItem) => {
  return (
    <div className={`c-main-slide-item c-main-slide-item--${position}`}>
      <img className="c-main-slide-item__img" src={screenShot}></img>
      <div className="c-main-slide-item__wrapper">
        <div className="c-main-slide-item__info flex">
          <div className="c-main-slide-item__play-icon-ctn">
            <PlayIcon className="c-main-slide-item__play-icon" size={72}></PlayIcon>
          </div>
          <div className="c-main-slide-item__text-ctn">
            <div className="l-row flex">
              <span className="c-main-slide-item__name">{name}</span>
              <span className="c-main-slide-item__duration">{duration}</span>
            </div>
            <div className="c-main-slide-item__description">{info}</div>
          </div>
        </div>
      </div>
      <div className="c-main-slide-item__poster">
        <div className="c-trailer-poster">
          <img className="c-trailer-poster__img" src={poster}></img>
          <div className="c-trailer-poster__add-btn">
            <RibbonBtn width={40} height={56}>
              <BtnIcon code="plus" _color="white" _fontSize="20px"></BtnIcon>
            </RibbonBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
