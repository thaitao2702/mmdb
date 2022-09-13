import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { InlineIcon } from 'shared/components/Icon';
import useOnOutsideClick from 'shared/hooks/onOutSideClick';

import './styles.scss';

interface IPaginationProps {
  currentPage: number;
  pageCount: number;
  distance?: number;
  onPageChange?: (...args: any[]) => any;
}

const Pagination = ({ currentPage, pageCount, distance = 2, onPageChange }: IPaginationProps) => {
  const isNextAble = currentPage < pageCount;
  const isPrevAble = currentPage > 1;
  const getBtnArr = () => {
    const indexArr = Array.from(Array(pageCount).keys()).map((index) => index + 1);
    let prevPart: any[] = indexArr.slice(0, currentPage);
    let nextPart: any[] = indexArr.slice(currentPage);
    let currentPart: any[] = [];
    if (prevPart.length > 2 * distance + 1) {
      prevPart = [1, '...'];
      currentPart = [
        ...Array.from(Array(distance).keys())
          .map((index) => index + 1)
          .reverse()
          .map((i) => currentPage - i),
        currentPage,
      ];
    }
    if (nextPart.length > 2 * distance + 1) {
      nextPart = ['...', pageCount];
      currentPart = [
        ...currentPart,
        ...Array.from(Array(distance).keys())
          .map((index) => index + 1)
          .map((i) => currentPage + i),
      ];
    }
    return [...prevPart, ...currentPart, ...nextPart];
  };

  const btnArr = getBtnArr();

  const onChange = (pageIndex: number) => {
    if (onPageChange) onPageChange(pageIndex);
  };

  return (
    <div className="c-pagination">
      {isPrevAble && (
        <InlineIcon
          className="c-pagination__btn"
          code="chevron-left"
          _fontSize="14px"
          _top="1px"
          onClick={() => {
            onChange(currentPage - 1);
          }}
        ></InlineIcon>
      )}
      {btnArr.map((index) => (
        <>
          {index === '...' ? (
            <GoToPageBtn key={Math.random()} onPageChange={onChange}></GoToPageBtn>
          ) : (
            <span
              key={index}
              className={`c-pagination__btn ${index === currentPage ? 'active' : ''}`}
              onClick={() => onChange(index)}
            >
              {index}
            </span>
          )}
        </>
      ))}
      {isNextAble && (
        <InlineIcon
          className="c-pagination__btn"
          code="chevron-right"
          _fontSize="14px"
          _top="1px"
          onClick={() => onChange(currentPage + 1)}
        ></InlineIcon>
      )}
    </div>
  );
};

export default Pagination;

const GoToPageBtn = ({ onPageChange }: { onPageChange?: (...args: any[]) => any }) => {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [inputValue, setInputValue] = useState<number | ''>('');
  const $inputRef = useRef<HTMLInputElement>(null);
  const $ctnRef = useRef<HTMLInputElement>(null);

  const onClose = () => {
    setIsOpenInput(false);
  };

  const onOpen = () => {
    setIsOpenInput(true);
    setFocusInput();
  };

  const setFocusInput = () => {
    if ($inputRef.current) $inputRef.current.focus();
  };

  const handleInputChange = (input: string) => {
    if (isNaN(Number(input))) setInputValue('');
    else setInputValue(+input);
  };

  useOnOutsideClick([$ctnRef], isOpenInput, onClose, null);

  useEffect(() => {
    setFocusInput();
  }, [isOpenInput]);

  return (
    <span className="c-goto-page-panel-ctn" ref={$ctnRef}>
      <span className="c-pagination__btn" onClick={onOpen}>
        ...
      </span>
      <CSSTransition in={isOpenInput} timeout={270} classNames="c-goto-page-panel" unmountOnExit>
        <div className="c-goto-page-panel">
          <input
            value={inputValue}
            type="text"
            onChange={(e) => handleInputChange(e.target.value)}
            ref={$inputRef}
          ></input>
          <span
            className="c-goto-page-panel__btn"
            onClick={() => onPageChange && onPageChange(inputValue)}
          >
            Go
          </span>
        </div>
      </CSSTransition>
    </span>
  );
};
