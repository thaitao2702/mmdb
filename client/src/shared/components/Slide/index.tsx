import React, { useState, useMemo } from 'react';
import { BtnIcon } from 'shared/components/Icon';

import './styles.scss';

import { IMovieListExtraInfo } from 'User/Home';

interface ISlideProps {
  slideData: IMovieListExtraInfo;
  isAutoPlay?: boolean;
  timeInterval?: number;
  renderItem: (...args: any) => JSX.Element;
  itemPerFrame: number;
}

interface ISlideData {
  dummy: IFrameData;
  prev: IFrameData;
  current: IFrameData;
  next: IFrameData;
}

interface IFrameData {
  id: number;
  transform: string;
  data: any[];
  className?: string;
}

const Slide = ({ slideData: propSlideData, itemPerFrame, renderItem }: ISlideProps) => {
  const slideData = useMemo(
    () =>
      Object.keys(propSlideData).reduce((prev, current) => {
        prev.push(propSlideData[+current]);
        return prev;
      }, [] as any[]),
    [propSlideData],
  );
  const slideLength = slideData.length;
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const slideItemWidth = 100 / itemPerFrame + '%';

  const getSlideFrameData = () => {
    const data: { [key: string]: any } = {};
    let dataIndex = 0;
    let frameIndex = 0;
    while (dataIndex <= slideLength - 1) {
      data[frameIndex] = {
        id: frameIndex,
        data: slideData.slice(dataIndex, dataIndex + itemPerFrame).filter((item) => item),
      };
      dataIndex += itemPerFrame;
      frameIndex++;
    }
    return data;
  };

  const slideDataByFrame = useMemo(() => getSlideFrameData(), [propSlideData, itemPerFrame]);

  const getCurrentSlideFrame = (index: number): ISlideData => {
    const prevTransform =
      slideDataByFrame[index].data.length < itemPerFrame
        ? -(slideDataByFrame[index].data.length * 100) / itemPerFrame
        : -100;
    const currentTransform =
      slideDataByFrame[index].data.length < itemPerFrame && slideDataByFrame[index - 1]
        ? ((itemPerFrame - slideDataByFrame[index].data.length) * 100) / itemPerFrame
        : 0;
    const nextTransform = 100;
    return {
      dummy: { ...slideDataByFrame[0], id: -1, className: 'c-slide__frame--dummy' },
      prev: { ...slideDataByFrame[index - 1], transform: prevTransform },
      current: { ...slideDataByFrame[index], transform: currentTransform },
      next: { ...slideDataByFrame[index + 1], transform: nextTransform },
    };
  };

  const currentSlideData = getCurrentSlideFrame(currentFrameIndex);
  const isNextable = !!currentSlideData['next'].data;
  const isPrevable = !!currentSlideData['prev'].data;

  const onNext = () => {
    setCurrentFrameIndex((prev) => prev + 1);
  };

  const onPrev = () => {
    setCurrentFrameIndex((prev) => prev - 1);
  };

  return (
    <div className="c-slide">
      {Object.entries(currentSlideData).map(([, frameData]) => (
        <div
          key={frameData.id != undefined ? frameData.id : -1 * Math.random() - 1}
          className={`c-slide__frame ${frameData.className || ''}`}
          style={{ transform: `translateX(${frameData.transform}%)` }}
        >
          {frameData &&
            frameData.data &&
            frameData.data.map((slideData: any) => (
              <div key={slideData.id} className="c-slide__item" style={{ width: slideItemWidth }}>
                {renderItem(slideData)}
              </div>
            ))}
        </div>
      ))}

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
  );
};

export default Slide;
