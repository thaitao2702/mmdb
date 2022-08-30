import React from 'react';

import Spinner from 'shared/components/Spinner';
import './styles.scss'

const PageLoader = () => (
  <div className="page-loader">
    <Spinner size={70} />
  </div>
);

export default PageLoader;
