import React from 'react';

import { IIconProps } from 'shared/svgs/interface';

const StarIcon = ({
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
      fill="currentColor"
      role="presentation"
      style={style}
    >
      <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
    </svg>
  );
};

export const StarOIcon = ({
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
      fill="currentColor"
      role="presentation"
      style={style}
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M19.65 9.04l-4.84-.42-1.89-4.45c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.73 3.67-3.18c.67-.58.32-1.68-.56-1.75zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
    </svg>
  );
};

export default StarIcon;
