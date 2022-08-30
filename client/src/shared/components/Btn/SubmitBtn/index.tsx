import React, { ReactNode } from 'react';
import './styles.scss';

interface menuBtnProps {
  [key: string]: any;
  children: ReactNode;
  className?: string;
  onClick?: (...args: any[]) => any;
  renderPrepend?: ReactNode;
  renderAppend?: ReactNode;
  disabled?: boolean;
}

const SubmitBtn = ({
  children,
  className = '',
  onClick,
  renderPrepend,
  renderAppend,
  disabled,
}: menuBtnProps) => {
  return (
    <button
      className={`c-admin-btn flex-vertical-center ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {renderPrepend}
      {children}
      {renderAppend}
    </button>
  );
};

export default SubmitBtn;
