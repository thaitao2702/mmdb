import React, { useState } from 'react';

import './styles.scss';

import { InlineIcon, BtnIcon } from 'shared/components/Icon';
import { MenuBtn } from 'shared/components/Btn';

interface IRatingModalProps {
  movieId: number;
  movieName: string;
  rate: number;
  onRate?: (...args: any[]) => any;
  onUnrate?: (...args: any[]) => any;
  onClose: (...args: any[]) => any;
}

const RatingModal = ({
  movieName,
  onRate: onRateProp,
  onUnrate: onUnrateProp,
  onClose,
  movieId,
  rate,
}: IRatingModalProps) => {
  const [selectedScore, setSelectedScore] = useState<number>(rate);
  const [activeScore, setActiveScore] = useState<number>(rate);
  const [isSelectedScore, setIsSelectedScore] = useState(!!rate);
  const isRated = !!rate;

  const onRate = (rate: number) => {
    if (onRateProp) onRateProp(movieId, rate);
    onClose();
  };

  const onUnrate = () => {
    if (onUnrateProp) onUnrateProp(movieId);
    onClose();
  };

  const onSetRatedScore = (rate: number) => {
    setIsSelectedScore(true);
    setSelectedScore(rate);
  };

  const onMouseEnter = (rate: number) => {
    if (activeScore !== rate) setActiveScore(rate);
  };

  const onMouseLeave = () => {
    if (isSelectedScore) setActiveScore(selectedScore);
    else setActiveScore(0);
  };

  const starSize = selectedScore ? 1 + selectedScore / 20 : 1;

  return (
    <div className="c-rating-modal">
      <div
        className={`c-rating-modal__rated-score ${isSelectedScore ? 'active' : ''}`}
        style={{ transform: `translateY(-50%) scale(${starSize})` }}
      >
        <BtnIcon code="star" className="c-rating-modal__rated-score-star"></BtnIcon>
        <div className="c-rating-modal__rated-score-number flex-center">
          {selectedScore ? selectedScore : '?'}
        </div>
      </div>
      <div className="c-rating-modal__close-btn" onClick={onClose}>
        <BtnIcon code="times"></BtnIcon>
      </div>
      <div className="c-rating-modal__title">RATE THIS</div>
      <div className="c-rating-modal__movie-name">{movieName}</div>
      <div className="c-rating-modal__rating-star-ctn flex">
        {Array.from(Array(10).keys())
          .map((i) => i + 1)
          .map((rate) => (
            <div
              key={rate}
              onMouseEnter={() => onMouseEnter(rate)}
              onMouseLeave={onMouseLeave}
              onClick={() => onSetRatedScore(rate)}
              className="c-rating-modal__rating-star"
            >
              {rate <= (activeScore || 0) ? (
                <InlineIcon code="star" className="rating-star--blue"></InlineIcon>
              ) : (
                <InlineIcon code="star-o"></InlineIcon>
              )}
            </div>
          ))}
      </div>
      <MenuBtn
        className={`c-menu-btn--light-grey c-menu-btn--full-width ${
          !selectedScore || selectedScore === rate ? 'c-menu-btn--disabled' : ''
        }`}
        onClick={() => onRate(selectedScore as number)}
      >
        Rate
      </MenuBtn>
      {isRated && (
        <MenuBtn
          className={`c-menu-btn--color-hover-blue c-menu-btn--full-width mt-15`}
          onClick={onUnrate}
        >
          Remove rating
        </MenuBtn>
      )}
    </div>
  );
};

export default RatingModal;
