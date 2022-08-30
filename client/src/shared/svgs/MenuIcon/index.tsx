import React from 'react';

import {IIconProps} from 'shared/svgs/interface';

const MenuIcon = ({ size = 24, displayBlock = true, customStyle = {}, className ='' }: IIconProps) => {
    const style = displayBlock ? { ...customStyle, display: 'block' } : customStyle;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={`svg-icon ${className}`}
            id="iconContext-menu"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="presentation"
            style = {style}
        >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
        </svg>
    );
};

export default MenuIcon;
