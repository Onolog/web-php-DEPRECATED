import cx from 'classnames';
import React, {PropTypes} from 'react';
import {MenuItem, NavDropdown} from 'react-bootstrap';
import {connect} from 'react-redux';

import AccountNavItem from 'components/Navigation/AccountNavItem.react';
import BaseAppPage from 'components/Page/BaseAppPage.react';
import FBImage from 'components/Facebook/FBImage.react';
import FlexContainer from 'components/FlexContainer/FlexContainer.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';
import ScrollContainer from 'components/ScrollContainer/ScrollContainer.react';
import SideMenu from 'components/Page/SideMenu.react';
import SideNav from 'components/Navigation/SideNav.react';

import {toggleSideNav} from 'actions/navigation';
import {logoutIfNeeded} from 'actions/session';

import './css/AppFullPage.css';

const SideColumn = ({onLogout, onToggle, open, user}) => (
  <FlexContainer className="side-col" column>
    <div className="side-col-header clearfix">
      <NavbarToggle onClick={onToggle} />
    </div>
    <ScrollContainer className="side-col-menu-container">
      <SideMenu open={open} user={user} />
    </ScrollContainer>
    <SideNav>
      <AccountNavItem
        arrow
        className="app-side-nav-item"
        dropup
        noCaret
        onLogout={onLogout}
        title={
          <span>
            <FBImage fbid={user.id} height={40} width={40} />
            <SideNav.ItemLabel>
              {user.name}
            </SideNav.ItemLabel>
          </span>
        }
        user={user}
      />
    </SideNav>
  </FlexContainer>
);

const SideColBackdrop = React.createClass({
  render() {
    return this.props.open ?
      <div
        className="side-col-backdrop modal-backdrop fade in"
        onClick={this.props.onToggle}
      /> : null;
  },
});

const mapStateToProps = ({navigation, session}) => {
  return {
    session,
    open: navigation.sideNavOpen,
  };
};

/**
 * AppFullPage.react
 */
const AppFullPage = ({children, className, dispatch, open, session}) => {
  const handleToggle = () => dispatch(toggleSideNav(open));

  return (
    <BaseAppPage
      className={cx('app-full-page', {'open': open}, className)}
      session={session}>
      <SideColumn
        onLogout={() => dispatch(logoutIfNeeded())}
        onToggle={handleToggle}
        open={open}
        user={session}
      />
      <SideColBackdrop
        onToggle={handleToggle}
        open={open}
      />
      <FlexContainer className="main-col" column>
        {children}
      </FlexContainer>
    </BaseAppPage>
  );
};

AppFullPage.propTypes = {
  open: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(AppFullPage);
