import React, { ReactNode } from 'react';
import './menuBtn.scss';

interface menuBtnProps {
    [key: string]: any;
    children: ReactNode;
    className?: string;
    onClick?: (...args:any[]) => any;
}

const MenuBtn = ({ children, className = '',  onClick}: menuBtnProps) => {
    return (
        <div className={`menu-btn flex-vertical-center ${className}`} onClick = {onClick}>
            {children}
        </div>
    );
};

export default MenuBtn;
