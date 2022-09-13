import React, { ReactNode } from 'react';
import './MenuBtn.scss';

interface menuBtnProps {
  [key: string]: any;
  children: ReactNode;
  className?: string;
  onClick?: (...args: any[]) => any;
}

const MenuBtn = ({ children, className = '', onClick }: menuBtnProps) => {
  return (
    <div className={`c-menu-btn ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default MenuBtn;
