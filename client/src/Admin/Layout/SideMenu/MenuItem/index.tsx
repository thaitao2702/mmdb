import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavLink, useLocation } from 'react-router-dom';
import './styles.scss';

import { InlineIcon } from 'shared/components/Icon';

interface ICategoryItemProps {
  to: string;
  title: string;
  icon?: string;
}

interface IMenuItemProps {
  title: string;
  className?: string;
  isMainMenu?: boolean;
  icon?: string;
  to?: string;
  isExpand?: boolean;
  isActive?: boolean;
  hasSubMenu?: boolean;
  onClickExpand?: (...args: any[]) => any;
}

interface IMenuCategoryProps {
  heading: ICategoryItemProps;
  subItems: ICategoryItemProps[];
}

export const MenuCategory = ({ heading, subItems }: IMenuCategoryProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const currentPath = useLocation().pathname;
  const isActive = subItems.some((item) => currentPath === item.to);

  const onClickExpandIcon = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpand((prev) => !prev);
  };
  return (
    <>
      <MenuItem
        title={heading.title}
        to={heading.to}
        isMainMenu={true}
        isActive={isActive}
        icon={heading.icon}
        onClickExpand={onClickExpandIcon}
        isExpand={isExpand}
        hasSubMenu={subItems.length > 0}
      ></MenuItem>
      <CSSTransition in={isExpand} timeout={500} classNames="sub-menu" unmountOnExit>
        <div className="side-menu-item__sub-menu">
          {subItems.length > 0 &&
            subItems.map((item) => (
              <MenuItem key={item.title} title={item.title} to={item.to}></MenuItem>
            ))}
        </div>
      </CSSTransition>
    </>
  );
};

export const MenuItem = ({
  title,
  className = '',
  isMainMenu = false,
  icon = '',
  to = '#',
  isExpand = false,
  isActive: propIsActive,
  onClickExpand,
  hasSubMenu,
}: IMenuItemProps) => {
  const isActive = isMainMenu ? propIsActive : useLocation().pathname === to;

  return (
    <div
      className={`side-menu-item ${className} ${isMainMenu ? 'main-menu' : ''} ${
        isExpand ? 'open' : ''
      } ${isActive ? 'active' : ''}`}
    >
      <NavLink to={to} className="side-menu-item__title">
        {icon && <InlineIcon code={icon} _top={1} className="mr-6" />}
        {title}
        {isMainMenu && hasSubMenu && (
          <InlineIcon
            code={isExpand ? 'chevron-down' : 'chevron-right'}
            onClick={onClickExpand}
            _width={'30px'}
            _height={'30px'}
            className="collapse-indicator flex-center"
          />
        )}
      </NavLink>
    </div>
  );
};

export default MenuCategory;
