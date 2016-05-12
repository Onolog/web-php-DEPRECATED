import cx from 'classnames';
import React from 'react';

import BaseAppPage from 'components/Page/BaseAppPage.react';
import FlexContainer from 'components/FlexContainer/FlexContainer.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';
import SideMenu from 'components/Page/SideMenu.react';

require('./css/AppFullPage.css');

/**
 * AppFullPage.react
 */
const AppFullPage = React.createClass({
  displayName: 'AppFullPage',

  getInitialState() {
    return {
      open: false,
    };
  },

  render() {
    const {open} = this.state;

    return (
      <BaseAppPage className={cx('app-full-page', {'open': open})}>
        <div className="left-col">
          <div className="left-col-header clearfix">
            <NavbarToggle onClick={this._handleSideNavToggle} />
          </div>
          <FlexContainer type="col">
            <div className="scrollable">
              <SideMenu open={open} />
            </div>
          </FlexContainer>
        </div>
        <FlexContainer className="main-col" type="col">
          {this.props.children}
        </FlexContainer>
      </BaseAppPage>
    );
  },

  _handleSideNavToggle() {
    this.setState({open: !this.state.open});
  },
});

module.exports = AppFullPage;
