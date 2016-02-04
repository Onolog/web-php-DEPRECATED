var React = require('react');
var UserActions = require('flux/actions/UserActions');
var UserStore = require('flux/stores/UserStore');

var FBImage = require('components/Facebook/FBImage.react');
var Link = require('components/Link/Link.react');
var Menu = require('components/Menu/Menu.react');
var MenuDivider = require('components/Menu/MenuDivider.react');
var MenuItem = require('components/Menu/MenuItem.react');
var Nav = require('components/Nav/Nav.react');
var NavItem = require('components/Nav/NavItem.react');
var Navbar = require('components/Navbar/Navbar.react');

var {CHANGE} = require('flux/ActionTypes');

var homeUrl = require('utils/homeUrl');
var pad = require('utils/pad');

/**
 * AppHeader.react
 */
var AppHeader = React.createClass({
  displayName: 'AppHeader',

  getInitialState: function() {
    return {
      isLoading: true,
      user: UserStore.getUser()
    };
  },

  componentDidMount: function() {
    UserStore.bind(CHANGE, this._onUserStoreUpdate);
  },

  componentWillUnmount: function() {
    UserStore.unbind(CHANGE, this._onUserStoreUpdate);
  },

  _onUserStoreUpdate: function() {
    var user = UserStore.getUser();
    this.setState({
      isLoading: !user,
      user: user
    });
  },

  render: function() {
    var user = this.state.user;

    return (
      <Navbar
        brand={<Link href={homeUrl()}>Onolog</Link>}
        className="header"
        fixed="top"
        inverse>
        {this._renderMainMenu(user)}
        {this._renderAccountMenu(user)}
        {this._renderLoginLink(user)}
      </Navbar>
    );
  },

  _renderAccountMenu: function(user) {
    if (user && user.id) {
      var menu =
        <Menu>
          <MenuItem href={'/users/profile/' + user.id} label="Profile" />
          <MenuItem href="/users/settings" label="Settings" />
          <MenuDivider />
          <MenuItem
            label="Sign Out"
            onClick={UserActions.logout}
          />
        </Menu>;

      return (
        <Nav right>
          <NavItem className="account-menu" menu={menu}>
            <FBImage
              className="accountImg"
              fbid={user.id}
              height={24}
              width={24}
            />
            <span className="accountName ellipses hidden-phone">
              {user.name}
            </span>
          </NavItem>
        </Nav>
      );
    }
  },

  _renderMainMenu: function(user) {
    if (user && user.id) {
      return (
        <Nav>
          <NavItem href={homeUrl()}>
            Calendar
          </NavItem>
          <NavItem href={'/users/profile/' + user.id}>
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
  _renderLoginLink: function(user) {
    if (!(user && user.id) && !this.state.isLoading) {
      return (
        <Nav right>
          <NavItem onClick={UserActions.login}>
            Sign In
          </NavItem>
        </Nav>
      );
    }
  }
});

module.exports = AppHeader;
