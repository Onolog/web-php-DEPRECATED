import React from 'react';
import {connect} from 'react-redux';

import AppContent from './AppContent.react';
import AppFooter from './AppFooter.react';
import AppHeader from './AppHeader.react';
import BaseAppPage from './BaseAppPage.react';

import './css/AppPage.css';

const mapStateToProps = ({session}) => {
  return {
    session,
  };
};

/**
 * AppPage.react
 */
const AppPage = ({children, narrow, session, ...pageProps}) => (
  <BaseAppPage {...pageProps} session={session}>
    <AppHeader user={session} />
    <AppContent narrow={narrow}>
      {children}
    </AppContent>
    <AppFooter />
  </BaseAppPage>
);

export default connect(mapStateToProps)(AppPage);
