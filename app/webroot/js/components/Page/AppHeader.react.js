import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap';
import React from 'react';

import FBImage from 'components/Facebook/FBImage.react';
import Link from 'components/Link/Link.react';

import UserActions from 'flux/actions/UserActions';
import UserStore from 'flux/stores/UserStore';

import homeUrl from 'utils/homeUrl';

import {CHANGE} from 'flux/ActionTypes';

require('./css/AppHeader.css');

/**
 * AppHeader.react
 */
const AppHeader = React.createClass({
  displayName: 'AppHeader',

  getInitialState() {
    return {
      isLoading: true,
      user: UserStore.getUser(),
    };
  },

  componentDidMount() {
    UserStore.bind(CHANGE, this._onUserStoreUpdate);
  },

  componentWillUnmount() {
    UserStore.unbind(CHANGE, this._onUserStoreUpdate);
  },

  _onUserStoreUpdate() {
    let user = UserStore.getUser();
    this.setState({
      isLoading: !user,
      user,
    });
  },

  render() {
    const {user} = this.state;

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
    if (user && user.id) {
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
            <MenuItem onClick={UserActions.logout}>
              Sign Out
            </MenuItem>
          </NavDropdown>
        </Nav>
      );
    }
  },

  _renderMainMenu(user) {
    if (user && user.id) {
      return (
        <Nav>
          <NavItem href={homeUrl()}>
            Calendar
          </NavItem>
          <NavItem href={`/users/profile/${user.id}`}>
            Profile
          </NavItem>
          <NavItem href="/users/shoes">
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
    if (!(user && user.id) && !this.state.isLoading) {
      return (
        <Nav pullRight>
          <NavItem onClick={UserActions.login}>
            Sign In
          </NavItem>
        </Nav>
      );
    }
  },
});

module.exports = AppHeader;
