import cx from 'classnames';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import BaseAppPage from 'components/Page/BaseAppPage.react';
import FlexContainer from 'components/FlexContainer/FlexContainer.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';
import SideMenu from 'components/Page/SideMenu.react';

import {toggleSideNav} from 'actions/navigation';

require('./css/AppFullPage.css');

const mapStateToProps = ({navigation, session}) => {
  return {
    session,
    sideNavOpen: navigation.sideNavOpen,
  };
};

/**
 * AppFullPage.react
 */
const AppFullPage = React.createClass({
  displayName: 'AppFullPage',

  propTypes: {
    session: PropTypes.object.isRequired,
    sideNavOpen: PropTypes.bool.isRequired,
  },

  render() {
    const {session, sideNavOpen} = this.props;

    return (
      <BaseAppPage
        className={cx('app-full-page', {'open': sideNavOpen})}
        session={session}>
        <div className="app-full-page-inner">
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
        </div>
      </BaseAppPage>
    );
  },

  _handleSideNavToggle() {
    const {dispatch, sideNavOpen} = this.props;
    dispatch(toggleSideNav(sideNavOpen));
  },
});

module.exports = connect(mapStateToProps)(AppFullPage);
