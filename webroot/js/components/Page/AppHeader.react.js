import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import FBImage from 'components/Facebook/FBImage.react';
import Link from 'components/Link/Link.react';

import {loginIfNeeded, logoutIfNeeded} from 'actions/session';
import homeUrl from 'utils/homeUrl';

const mapStateToProps = ({session}) => {
  return {
    user: session,
  };
};

require('./css/AppHeader.css');

/**
 * AppHeader.react
 */
const AppHeader = React.createClass({
  displayName: 'AppHeader',

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
            <Link href={homeUrl()}>Onolog</Link>
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
      let title =
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
          <NavDropdown
            className="account-menu"
            id="account-menu"
            title={title}>
            <div className="arrow hidden-xs" />
            <MenuItem href={`/users/profile/${user.id}`}>
              Profile
            </MenuItem>
            <MenuItem href="/users/settings">
              Settings
            </MenuItem>
            <MenuItem divider />
            <MenuItem onClick={this._handleLogout}>
              Sign Out
            </MenuItem>
          </NavDropdown>
        </Nav>
      );
    }
  },

  _renderMainMenu(user) {
    if (user.id) {
      return (
        <Nav>
          <NavItem href={homeUrl()}>
            Calendar
          </NavItem>
          <NavItem href={`/users/profile/${user.id}`}>
            Profile
          </NavItem>
          <NavItem href="/shoes">
            Shoes
          </NavItem>
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

module.exports = connect(mapStateToProps)(AppHeader);
