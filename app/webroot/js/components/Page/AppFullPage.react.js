import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Glyphicon, Nav, NavItem, OverlayTrigger, Tooltip} from 'react-bootstrap';

import BaseAppPage from 'components/Page/BaseAppPage.react';
import FlexContainer from 'components/FlexContainer/FlexContainer.react';
import NavbarToggle from 'components/Navigation/NavbarToggle.react';

require('../../../css/base/app-full-page.css');

const SideMenu = React.createClass({
  displayName: 'SideMenu',

  propTypes: {
    open: React.PropTypes.bool.isRequired
  },

  render() {
    const navItems = [
      {
        href: '',
        icon: 'home',
        label: 'Home',
      },
      {
        href: '/',
        icon: 'calendar',
        label: 'Calendar',
      },
      {
        href: '',
        icon: 'home',
        label: 'Activities',
      },
      {
        href: 'users/profile',
        icon: 'user',
        label: 'Profile',
      },
      {
        href: '/users/shoes',
        icon: 'fire',
        label: 'Shoes',
      },
      {
        href: '/users/friends',
        icon: 'picture',
        label: 'Friends',
      },
      {
        href: '/users/settings',
        icon: 'cog',
        label: 'Settings',
      },
    ];

    return (
      <Nav pills stacked>
        {navItems.map(this._renderNavItem)}
      </Nav>
    );
  },

  _renderNavItem: function(item, idx) {
    let navItem =
      <NavItem className="nav-item" href={item.href} key={idx}>
        <Glyphicon glyph={item.icon} />
        <span className="nav-item-label">{item.label}</span>
      </NavItem>;

    // Display a tooltip on hover when the nav is collapsed.
    return this.props.open ?
      navItem :
      <OverlayTrigger
        key={idx}
        overlay={<Tooltip id={idx}>{item.label}</Tooltip>}
        placement="right">
        {navItem}
      </OverlayTrigger>;
  },
});

/**
 * AppFullPage.react
 */
const AppFullPage = React.createClass({
  displayName: 'AppFullPage',

  getInitialState() {
    return {
      open: false
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
