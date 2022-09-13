import React from 'react';

import { IIconProps } from 'shared/svgs/interface';

import './styles.scss';

const Ribbon = ({
  width = 24,
  height = 34,
  displayBlock = true,
  customStyle = {},
  className = '',
}: IIconProps) => {
  const style = displayBlock ? { ...customStyle, display: 'block' } : customStyle;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={`svg-icon ribbon ${className}`}
      id="iconContext-menu"
      viewBox="0 0 24 34"
      fill="currentColor"
      role="presentation"
      style={style}
    >
      <polygon
        className="ribbon__bg-ribbon"
        fill="#000000"
        points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
      ></polygon>
      <polygon
        className="ribbon__bg-hover"
        points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
      ></polygon>
      <polygon
        className="ribbon__bg-shadow"
        points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"
      ></polygon>
    </svg>
  );
};

export default Ribbon;
