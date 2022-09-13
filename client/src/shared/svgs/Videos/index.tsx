import React from 'react';

import { IIconProps } from 'shared/svgs/interface';

const Videos = ({
  size = 24,
  displayBlock = true,
  customStyle = {},
  className = '',
}: IIconProps) => {
  const style = displayBlock ? { ...customStyle, display: 'block' } : customStyle;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={`svg-icon ${className}`}
      id="iconContext-star"
      viewBox="0 0 24 24"
      role="presentation"
      style={style}
    >
      <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
    </svg>
  );
};

export default Videos;