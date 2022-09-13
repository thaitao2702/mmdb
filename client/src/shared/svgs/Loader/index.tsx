import React from 'react';

import { IIconProps } from 'shared/svgs/interface';

const Loader = ({
  size = 100,
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
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      fill="currentColor"
      role="presentation"
      enableBackground="new 0 0 0 0"
      style={style}
    >
      <circle stroke="none" cx="30" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1.5s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        ></animate>
      </circle>
      <circle stroke="none" cx="50" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1.5s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        ></animate>
      </circle>
      <circle stroke="none" cx="70" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1.5s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.5"
        ></animate>
      </circle>
    </svg>
  );
};

export default Loader;
