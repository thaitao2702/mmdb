import React from 'react';

import { IIconProps } from 'shared/svgs/interface';

const Logo = ({
  width = 64,
  height = 32,
  className = '',
  displayBlock = true,
  customStyle = {},
}: IIconProps) => {
  const style = displayBlock ? { ...customStyle, display: 'block', opacity: '1' } : customStyle;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon ${className}`}
      id="iconContext-watchlist"
      viewBox="0 0 64 32"
      fill="currentColor"
      role="presentation"
      style={style}
    >
      <g>
        <path
          fill="#F5C518"
          d="M4,0h56c2.2,0,4,1.8,4,4v24c0,2.2-1.8,4-4,4H4c-2.2,0-4-1.8-4-4V4C0,1.8,1.8,0,4,0z"
        />
      </g>
      <g transform="translate(8.000000, 7.000000)">
        <path d="M21.4,0.3l-1.1,8.3l-0.7-4.5c-0.2-1.4-0.4-2.7-0.6-3.8h-6.2V18H17l0-11.7L18.8,18h3l1.7-11.9l0,11.9h4.2V0.3H21.4z" />
        <path
          d="M29.5,18V0.3h7.7c1.7,0,3.1,1.4,3.1,3.1v11.4c0,1.7-1.4,3.1-3.1,3.1H29.5z M35.3,3.5c-0.2-0.1-0.6-0.2-1.1-0.2v11.6
        c0.7,0,1.2-0.1,1.3-0.4c0.2-0.3,0.2-1,0.2-2.2V5.5c0-0.8,0-1.3-0.1-1.5C35.6,3.8,35.5,3.6,35.3,3.5z"
        />
        <path
          d="M49.6,4.8h0.3c1.8,0,3.2,1.4,3.2,3.1v7.1c0,1.7-1.4,3.1-3.2,3.1h-0.3c-1.1,0-2-0.5-2.6-1.3l-0.3,1.1h-4.4V0.3H47V6
        C47.6,5.3,48.5,4.8,49.6,4.8z M48.6,13.4V9.2c0-0.7,0-1.1-0.1-1.4c-0.1-0.2-0.5-0.3-0.7-0.3c-0.3,0-0.7,0.1-0.7,0.3v1.4v4.3v1.4
        c0.1,0.2,0.5,0.3,0.7,0.3s0.7-0.1,0.7-0.3C48.5,14.7,48.6,14.2,48.6,13.4z"
        />
        <path d="M4.7,0.3L3.6,8.6L2.9,4.1C2.7,2.6,2.5,1.4,2.3,0.3h-6.2V18h4.2l0-11.7L2.1,18h3L6.7,6.1l0,11.9h4.2V0.3H4.7z" />
      </g>
    </svg>
  );
};

export default Logo;
