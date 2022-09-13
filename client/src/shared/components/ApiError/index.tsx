import React from 'react';

import './styles.scss';

import { ErrorFace } from 'shared/svgs';
import { MenuBtn } from 'shared/components/Btn';

interface IApiErrorProps {
  onRetry?: (...args: any[]) => any;
}

const ApiError = ({ onRetry }: IApiErrorProps) => {
  return (
    <div className="c-api-error">
      <ErrorFace customStyle={{ fill: '#d7d7d7' }}></ErrorFace>
      <div className="c-api-error__message mt-20">We're having hard time loading this page</div>
      {onRetry && (
        <MenuBtn className="c-menu-btn c-menu-btn--yellow c-menu-btn--big mt-25" onClick={onRetry}>
          <div> Retry</div>
        </MenuBtn>
      )}
    </div>
  );
};

export default ApiError;
