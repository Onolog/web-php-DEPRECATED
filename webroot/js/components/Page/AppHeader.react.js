import {Nav, Navbar, NavItem} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import AccountNavItem from 'components/Navigation/AccountNavItem.react';
import FBImage from 'components/Facebook/FBImage.react';

import {loginIfNeeded, logoutIfNeeded} from 'actions/session';
import homeUrl from 'utils/homeUrl';

import './css/AppHeader.css';

/**
 * AppHeader.react
 */
const AppHeader = React.createClass({
  propTypes: {
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
  },

  render() {
    const {user} = this.props;

    return (
      <Navbar
        className="app-header"
        fixedTop
        fluid
        inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={{pathname: homeUrl()}}>Onolog</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this._renderMainMenu(user)}
          {this._renderAccountMenu(user)}
          {this._renderLoginLink(user)}
        </Navbar.Collapse>
      </Navbar>
    );
  },

  _renderAccountMenu(user) {
    if (user.id) {
      const title =
        <span>
          <FBImage
            className="account-img"
            fbid={user.id}
            height={24}
            width={24}
          />
          <span className="account-name ellipses">
            {user.name}
          </span>
        </span>;

      return (
        <Nav pullRight>
          <AccountNavItem
            arrow
            className="account-menu"
            onLogout={this._handleLogout}
            title={title}
            user={user}
          />
        </Nav>
      );
    }
  },

  _renderMainMenu(user) {
    if (user.id) {
      const links = [
        {label: 'Calendar', pathname: homeUrl()},
        {label: 'Profile', pathname: `/users/${user.id}`},
        {label: 'Shoes', pathname: '/shoes'},
      ];

      return (
        <Nav>
          {links.map(({label, pathname}, idx) => (
            <LinkContainer key={idx} to={{pathname}}>
              <NavItem>{label}</NavItem>
            </LinkContainer>
          ))}
        </Nav>
      );
    }
  },

  /**
   * If there's no user info, it means the user isn't logged in. Prompt them
   * to do so.
   */
  _renderLoginLink(user) {
    if (!user.id) {
      return (
        <Nav pullRight>
          <NavItem onClick={this._handleLogin}>
            Sign In
          </NavItem>
        </Nav>
      );
    }
  },

  _handleLogin() {
    this.props.dispatch(loginIfNeeded());
  },

  _handleLogout() {
    this.props.dispatch(logoutIfNeeded());
  },
});

export default connect()(AppHeader);
