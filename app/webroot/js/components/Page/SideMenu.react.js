import React from 'react';
import {Glyphicon, Nav, NavItem, OverlayTrigger, Tooltip} from 'react-bootstrap';

require('../../../css/components/SideMenu.css');

const SideMenu = React.createClass({
  displayName: 'SideMenu',

  propTypes: {
    open: React.PropTypes.bool.isRequired,
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
      <Nav className="app-side-menu" pills stacked>
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

module.exports = SideMenu;
