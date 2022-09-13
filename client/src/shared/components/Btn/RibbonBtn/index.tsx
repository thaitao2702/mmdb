import React, { ReactNode } from 'react';
import './styles.scss';

import { Ribbon } from 'shared/svgs';
import Spinner from 'shared/components/Spinner';

interface IRibbonBtn {
  [key: string]: any;
  className?: string;
  ribbonClassName?: string;
  onClick?: (...args: any[]) => any;
  width?: number;
  height?: number;
  iconSize?: number;
  loading?: boolean;
  children?: ReactNode;
  spinnerColor?: string;
}

const RibbonBtn = ({
  width = 24,
  height = 34,
  iconSize = 18,
  className = '',
  onClick,
  loading = false,
  children,
  ribbonClassName,
  spinnerColor,
}: IRibbonBtn) => {
  return (
    <div className={`c-ribbon-btn flex-vertical-center ${className}`} onClick={onClick}>
      <Ribbon width={width} height={height} className={ribbonClassName}></Ribbon>
      <div className="c-ribbon-btn__icon">
        {loading ? (
          <Spinner className="c-btn-icon" color={spinnerColor} size={iconSize * 1.3}></Spinner>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default RibbonBtn;
