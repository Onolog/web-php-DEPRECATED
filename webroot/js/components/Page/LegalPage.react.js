import React from 'react';

import AppFooter from 'components/Page/AppFooter.react';
import AppFullPage from 'components/Page/AppFullPage.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';
import ScrollContainer from 'components/ScrollContainer/ScrollContainer.react';

import './css/LegalPage.css';

const LegalPage = props => (
  <AppFullPage>
    <PageHeader full title={props.title} />
    <PageFrame>
      <ScrollContainer>
        <div className="legal-page">
          <div className="legal-page-content">
            {props.children}
          </div>
        </div>
        <AppFooter />
      </ScrollContainer>
    </PageFrame>
  </AppFullPage>
);

export default LegalPage;
