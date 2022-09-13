import React, { useState, useRef, useEffect, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';

import './styles.scss';

import useOnOutsideClick from 'shared/hooks/onOutSideClick';
import useOnEscapeKeyDown from 'shared/hooks/onEscapeKeyDown';

interface IModalProps {
  renderContent: (...args: any[]) => JSX.Element;
  renderLink?: (...args: any[]) => JSX.Element;
  isOpen?: boolean;
  onClose?: (...args: any[]) => any;
  maxWidth?: number;
}

const Modal = ({
  renderContent,
  isOpen: isOpenProp,
  renderLink,
  onClose: onCloseProp,
  maxWidth = 1080,
}: IModalProps) => {
  const [stateIsOpen, setStateIsOpen] = useState(false);
  const isControlled = isOpenProp != undefined;
  const isOpen = isControlled ? isOpenProp : stateIsOpen;
  const $modalRef = useRef<HTMLDivElement>(null);
  const $overlayRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    if (!isControlled) setStateIsOpen(false);
    else if (onCloseProp) onCloseProp();
  };

  const onOpen = () => {
    setStateIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  useOnOutsideClick([$modalRef], isOpen as boolean, onClose, $overlayRef);
  useOnEscapeKeyDown(isOpen as boolean, onClose);

  return (
    <Fragment>
      {!isControlled && renderLink && renderLink({ onOpen })}

      <CSSTransition in={isOpen} timeout={500} classNames="c-modal" unmountOnExit>
        <>
          {ReactDOM.createPortal(
            <div className="c-modal">
              <div className="c-modal__overlay" ref={$overlayRef}>
                <div className="c-modal__ctn" ref={$modalRef} style={{ maxWidth: `${maxWidth}px` }}>
                  {renderContent({ onClose })}
                </div>
              </div>
            </div>,
            $root as HTMLElement,
          )}
        </>
      </CSSTransition>
    </Fragment>
  );
};
const $root = document.getElementById('root');

export default Modal;
