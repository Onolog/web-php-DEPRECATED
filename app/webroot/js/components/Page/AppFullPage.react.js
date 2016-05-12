import cx from 'classnames';
import React from 'react';

import BaseAppPage from 'components/Page/BaseAppPage.react';
import FlexContainer from 'components/FlexContainer/FlexContainer.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';
import SideMenu from 'components/Page/SideMenu.react';

import {CHANGE} from 'flux/ActionTypes';
import NavActions from 'flux/actions/NavActions';
import NavStore from 'flux/stores/NavStore';

require('./css/AppFullPage.css');

/**
 * AppFullPage.react
 */
const AppFullPage = React.createClass({
  displayName: 'AppFullPage',

  componentDidMount() {
    NavStore.bind(CHANGE, this._navChanged);
  },

  componentWillUnmount() {
    NavStore.unbind(CHANGE, this._navChanged);
  },

  getInitialState() {
    return {
      open: NavStore.isSideNavOpen(),
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
    NavActions.toggleSideNav();
  },

  _navChanged() {
    this.setState({open: NavStore.isSideNavOpen()});
  },
});

module.exports = AppFullPage;
