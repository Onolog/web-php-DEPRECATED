import React, {PropTypes} from 'react';
import {Glyphicon, Nav, NavItem, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import homeUrl from 'utils/homeUrl';

import './css/SideMenu.css';

const SideMenu = React.createClass({
  displayName: 'SideMenu',

  propTypes: {
    open: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  },

  render() {
    const navItems = [
      {
        href: homeUrl(),
        icon: 'calendar',
        label: 'Calendar',
      },
      {
        href: `/users/${this.props.user.id}`,
        icon: 'user',
        label: 'Profile',
      },
      {
        href: '/shoes',
        icon: 'fire',
        label: 'Shoes',
      },
      /*
      {
        href: '/friends',
        icon: 'picture',
        label: 'Friends',
      },
      */
      {
        href: '/settings',
        icon: 'cog',
        label: 'Settings',
      },
    ];

    return (
      <Nav className="app-side-menu" pills stacked>
        {navItems.map(this._renderNavItem)}
      </Nav>
    );
  },

  _renderNavItem(item, idx) {
    let navItem =
      <LinkContainer key={idx} to={{pathname: item.href}}>
        <NavItem className="nav-item">
          <Glyphicon glyph={item.icon} />
          <span className="nav-item-label">{item.label}</span>
        </NavItem>
      </LinkContainer>;

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

export default SideMenu;
