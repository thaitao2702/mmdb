import React from 'react';

import './styles.scss';
import { getStyleFromProps } from 'shared/utils/styles';

interface IInlineIconProps {
  [key: string]: any;
  code: string;
  className?: string;
  onClick?: (...args: any[]) => any;
}

export const Icon = (props: IInlineIconProps) => {
  const { code, className, onClick = () => {} } = props;
  const styles = getStyleFromProps(props);
  return (
    <span
      className={`${className || ''} icon-${code}`}
      style={styles}
      onClick={onClick}
    ></span>
  );
};

export const InlineIcon = (props: IInlineIconProps) => {
  const { className, ...rest } = props;
  let clName = `c-inline-icon`;
  if (className) clName += ` ${className}`;
  return <Icon className={clName} {...rest}></Icon>;
};

export const BtnIcon = (props: IInlineIconProps) => {
  const { className, ...rest } = props;
  let clName = `c-btn-icon`;
  if (className) clName += ` ${className}`;
  return <Icon className={clName} {...rest}></Icon>;
};
