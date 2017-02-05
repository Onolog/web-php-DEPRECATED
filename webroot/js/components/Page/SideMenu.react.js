import React from 'react';
import {Glyphicon, Nav, NavItem, OverlayTrigger, Tooltip} from 'react-bootstrap';

import './css/SideMenu.css';

const SideMenu = React.createClass({
  displayName: 'SideMenu',

  propTypes: {
    open: React.PropTypes.bool.isRequired,
  },

  render() {
    const navItems = [
      {
        href: '/',
        icon: 'home',
        label: 'Home',
      },
      {
        href: '/',
        icon: 'calendar',
        label: 'Calendar',
      },
      {
        href: '/',
        icon: 'home',
        label: 'Activities',
      },
      {
        href: '/users',
        icon: 'user',
        label: 'Profile',
      },
      {
        href: '/shoes',
        icon: 'fire',
        label: 'Shoes',
      },
      {
        href: '/friends',
        icon: 'picture',
        label: 'Friends',
      },
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

export default SideMenu;
