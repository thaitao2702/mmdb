import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

import { InlineIcon } from 'shared/components/Icon';

interface IHeadingProps {
  className?: string;
  text: string;
  variant?: ('light' | 'dark' | 'big')[];
  to?: string;
}

const Heading = ({ text, variant = ['light'], to, className = '' }: IHeadingProps) => {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className={`c-heading ${variant.map((v) => 'c-heading--' + v).join(' ')} ${className}`}
        >
          {text}
          <InlineIcon code="chevron-right" className="c-heading__arrow"></InlineIcon>
        </Link>
      ) : (
        <div
          className={`c-heading ${variant.map((v) => 'c-heading--' + v).join(' ')} ${className}`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Heading;
