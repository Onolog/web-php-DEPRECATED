import cx from 'classnames';
import React from 'react';
import {connect} from 'react-redux';

import BaseAppPage from 'components/Page/BaseAppPage.react';
import FlexContainer from 'components/FlexContainer/FlexContainer.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';
import SideMenu from 'components/Page/SideMenu.react';

import {toggleSideNav} from 'actions/navigation';

require('./css/AppFullPage.css');

const mapStateToProps = ({navigation}) => {
  return {
    sideNavOpen: navigation.sideNavOpen,
  };
};

/**
 * AppFullPage.react
 */
const AppFullPage = React.createClass({
  displayName: 'AppFullPage',

  propTypes: {
    sideNavOpen: PropTypes.bool.isRequired,
  },

  render() {
    const {sideNavOpen} = this.props;

    return (
      <BaseAppPage className={cx('app-full-page', {'open': sideNavOpen})}>
        <div className="left-col">
          <div className="left-col-header clearfix">
            <NavbarToggle onClick={this._handleSideNavToggle} />
          </div>
          <FlexContainer type="col">
            <div className="scrollable">
              <SideMenu open={sideNavOpen} />
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
    const {dispatch, sideNavOpen} = this.props;
    dispatch(toggleSideNav(sideNavOpen));
  },
});

module.exports = connect(mapStateToProps)(AppFullPage);
