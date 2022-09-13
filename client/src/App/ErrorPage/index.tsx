import React from 'react';

import './styles.scss';

const ErrorPage = () => {
  return (
    <div className="c-error-page">
      <div className="c-error-page__ctn">
        <div className="c-error-page__message">
          The requested URL was not found on our server. <a href="/">Go to the homepage </a>»
        </div>
        <div className="c-error-page__error-bubble flex-vertical-center">
          <div className="c-error-page__error-code">
            404
            <br />
            <span>Error</span>
          </div>
          <div className="c-error-page__error-quote">
            Yeah... I'm gonna need you to go ahead and find another page.
          </div>
        </div>
        <div className="c-error-page__error-attrib">Bill Lumbergh, Office Space (1999)</div>
      </div>
    </div>
  );
};

export default ErrorPage;
