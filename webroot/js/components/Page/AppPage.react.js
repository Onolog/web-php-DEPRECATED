import React from 'react';
import {connect} from 'react-redux';

import AppFooter from './AppFooter.react';
import AppHeader from './AppHeader.react';
import AppPageContent from './AppPageContent.react';
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
const AppPage = ({children, className, narrow, session}) => (
  <BaseAppPage className={className} session={session}>
    <AppHeader user={session} />
    <AppPageContent narrow={narrow}>
      {children}
    </AppPageContent>
    <AppFooter />
  </BaseAppPage>
);

export default connect(mapStateToProps)(AppPage);
