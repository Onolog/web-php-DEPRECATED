define([

  'lib/react/react',
  'lib/react/jsx!components/Facebook/FBImage.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Menu/Menu.react',
  'lib/react/jsx!components/Menu/MenuDivider.react',
  'lib/react/jsx!components/Menu/MenuItem.react',
  'lib/react/jsx!components/Nav/Nav.react',
  'lib/react/jsx!components/Nav/NavItem.react',
  'lib/react/jsx!components/Navbar/Navbar.react',

  'actions/UserActions',
  'mixins/StoreMixin.react',
  'stores/UserStore',
  'utils/homeUrl',
  'utils/pad'

], function(

  React,
  FBImage,
  Link,
  Menu,
  MenuDivider,
  MenuItem,
  Nav,
  NavItem,
  Navbar,

  UserActions,
  StoreMixin,
  UserStore,
  homeUrl,
  pad

) {

  /**
   * AppHeader.react
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: 'AppHeader',

    mixins: [StoreMixin],

    getInitialState: function() {
      return {
        user: {}
      };
    },

    componentWillMount: function() {
      this.stores = [this.setStoreInfo(UserStore, this._onUserStoreUpdate)];

      if (UserStore.getIsLoggedIn()) {
        this.setState({user: UserStore.getUser()});
      }
    },

    _onUserStoreUpdate: function() {
      this.setState({user: UserStore.getUser()});
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
      if (!user.id) {
        return;
      }

      var menu =
        <Menu>
          <MenuItem href={'/users/profile/' + user.id} label="Profile" />
          <MenuItem href="/users/settings" label="Settings" />
          <MenuDivider />
          <MenuItem href="/users/logout" label="Sign Out" />
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
    },

    _renderMainMenu: function(user) {
      if (user.id) {
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
     * If there's no user info, it means the user isn't logged in. Propmt them
     * to do so.
     */
    _renderLoginLink: function(user) {
      if (!user.id) {
        return (
          <Nav right>
            <NavItem href="/users/login">
              Sign In
            </NavItem>
          </Nav>
        );
      }
    }
  });

});
