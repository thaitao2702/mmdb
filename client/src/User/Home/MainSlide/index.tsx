import React, { useState, useEffect, useRef } from 'react';

import './styles.scss';

import SlideItem from './SlideItem';
import SideSlideItem from './SideSlideItem';
import { BtnIcon, InlineIcon } from 'shared/components/Icon';

import { ITrailer } from 'User/Home';

interface ISlideProps {
  slideData: ITrailer[];
  isLoop?: boolean;
  isAutoPlay?: boolean;
  timeInterval?: number;
}

interface IMainSlideData {
  prev?: ITrailer;
  current?: ITrailer;
  next?: ITrailer;
}

const MainSlide = ({
  slideData,
  isLoop = true,
  isAutoPlay = false,
  timeInterval = 5000,
}: ISlideProps) => {
  const slideLength = slideData.length;
  const currentIndex = useRef(0);
  const isNextable = isLoop || currentIndex.current !== slideLength;
  const isPrevable = isLoop || currentIndex.current !== 0;

  useEffect(() => {
    let SlideInterval: NodeJS.Timer;
    if (isAutoPlay) {
      SlideInterval = setInterval(() => {
        onNext();
      }, timeInterval);
    }
    return () => clearInterval(SlideInterval);
  }, []);

  const getMainSlide = (index: number) => {
    if (index === 0) {
      return {
        prev: isLoop ? slideData[slideLength - 1] : undefined,
        current: slideData[index],
        next: slideData[index + 1],
      };
    } else if (index === slideLength - 1) {
      return {
        prev: slideData[index - 1],
        current: slideData[index],
        next: isLoop ? slideData[0] : undefined,
      };
    }
    return {
      prev: slideData[index - 1],
      current: slideData[index],
      next: slideData[index + 1],
    };
  };

  const getSideSlide = (index: number) => {
    let slides = [];
    let nextIndex = index + 1;
    for (let i = 0; i < 3; i++) {
      if (nextIndex == slideLength) nextIndex = 0;
      const slide = slideData[nextIndex];
      slides.push(slide);
      nextIndex += 1;
    }
    return slides;
  };

  const [mainSlideData, setMainSlideData] = useState<IMainSlideData>(getMainSlide(0));
  const [sideSlideData, setSideSlideData] = useState<ITrailer[]>(getSideSlide(0));

  const onNext = () => {
    let index;
    if (currentIndex.current === slideLength - 1) index = 0;
    else index = currentIndex.current + 1;
    currentIndex.current = index;
    setMainSlideData(getMainSlide(index));
    setSideSlideData(getSideSlide(index));
  };

  const onPrev = () => {
    let index;
    if (currentIndex.current === 0) index = slideLength - 1;
    else index = currentIndex.current - 1;
    currentIndex.current = index;
    setMainSlideData(getMainSlide(index));
    setSideSlideData(getSideSlide(index));
  };

  return (
    <div className="l-main-slide-wrapper l-main-content-wrapper flex">
      <div className="c-main-slide ">
        {Object.entries(mainSlideData).map(([key, el]) => {
          return <SlideItem key={el.id} {...el} position={key}></SlideItem>;
        })}
        {isNextable && (
          <div className="c-slide-btn c-slide-btn--next" onClick={onNext}>
            <BtnIcon code="chevron-right"></BtnIcon>
          </div>
        )}
        {isPrevable && (
          <div className="c-slide-btn c-slide-btn--prev" onClick={onPrev}>
            <BtnIcon code="chevron-left"></BtnIcon>
          </div>
        )}
      </div>
      <div className="c-side-slide">
        <div className="c-side-slide__heading">Up next</div>
        <div className="c-side-slide__content">
          {sideSlideData.map((slide) => (
            <SideSlideItem {...slide} key={slide.id}></SideSlideItem>
          ))}
        </div>
        <div className="c-side-slide__bottom-link">
          <a href="#">
            Browse trailers <InlineIcon code="chevron-right" _fontSize="12px"></InlineIcon>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainSlide;
