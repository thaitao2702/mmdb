import React from 'react';

import { Loader } from 'shared/svgs';
import './styles.scss';

const PageLoader = ({ color }: { color?: string }) => {
  const styleObj = color ? { color } : {};
  return (
    <div className="c-page-loader flex-center" style={styleObj}>
      <Loader />
    </div>
  );
};

export default PageLoader;
