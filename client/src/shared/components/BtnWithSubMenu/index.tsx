import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import useOnOutside from 'shared/hooks/onOutSide';

import './styles.scss';

interface BtnWithSubMenuProps {
  className?: string;
  renderBtn: (...args: any[]) => JSX.Element;
  renderSubMenu?: () => JSX.Element;
  style: { [key: string]: any };
}

const BtnWithSubMenu = ({ renderBtn, renderSubMenu, style }: BtnWithSubMenuProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const $userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpenMenu((prev) => !prev);

  const closeMenu = () => setIsOpenMenu(false);

  useOnOutside($userMenuRef, isOpenMenu, closeMenu);

  return (
    <span className="c-btn-with-sub-menu" ref={$userMenuRef} style={style}>
      {renderBtn({ isOpenMenu, toggleMenu, closeMenu })}
      <CSSTransition
        in={isOpenMenu}
        timeout={300}
        classNames="c-main-menu__sub-menu-ctn"
        unmountOnExit
      >
        <>{renderSubMenu && renderSubMenu()}</>
      </CSSTransition>
    </span>
  );
};

export default BtnWithSubMenu;
