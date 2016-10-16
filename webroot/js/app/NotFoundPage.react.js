import React from 'react';

import AppPage from 'components/Page/AppPage.react';
import PageHeader from 'components/Page/PageHeader.react';

/**
 * NotFoundPage.react
 *
 * Catch-all page if a route doesn't match.
 */
const NotFoundPage = props => (
  <AppPage className="error-page">
    <PageHeader title="Sorry, this page isn't available" />
    <p>
      The link you followed may be broken, or the page may have been removed.
    </p>
  </AppPage>
);

module.exports = NotFoundPage;
