import React from 'react';
import {browserHistory} from 'react-router';

import BaseAppPage from 'components/Page/BaseAppPage.react';
import Link from 'components/Link/Link.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';
import Middot from 'components/Middot.react';

import './css/NotFound.scss';

/**
 * NotFoundController.react
 *
 * Catch-all page if a route doesn't match.
 */
const NotFoundController = props => (
  <BaseAppPage className="error-page">
    <div className="container">
      <h2>Page not found.</h2>
      <MaterialIcon
        className="error-page-icon"
        icon="alert-octagram"
      />
      <p>
        The link you followed may be broken, or the page may have been removed.
      </p>
      <ul className="list-inline">
        <li>
          <Link onClick={browserHistory.goBack}>
            Back
          </Link>
        </li>
        <li>
          <Middot />
        </li>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
      </ul>
    </div>
  </BaseAppPage>
);

module.exports = NotFoundController;
