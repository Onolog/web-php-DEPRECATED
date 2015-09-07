define([

  'lib/react/react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Menu/Menu.react',
  'lib/react/jsx!components/Menu/MenuDivider.react',
  'lib/react/jsx!components/Menu/MenuItem.react',
  'lib/react/jsx!components/Nav/Nav.react',
  'lib/react/jsx!components/Nav/NavItem.react',
  'lib/react/jsx!components/Navbar/Navbar.react',
  'utils/pad'

], function(

  React,
  Link,
  Menu,
  MenuDivider,
  MenuItem,
  Nav,
  NavItem,
  Navbar,
  pad

) {

  function getHomeUrl() {
    var now = new Date();
    return '/' + now.getFullYear() + '/' + pad(now.getMonth() + 1, 2);
  }

  /**
   * AppHeader.react
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: 'AppHeader',

    propTypes: {
      user: React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string,
      })
    },

    getDefaultProps: function() {
      return {
        user: {
          id: 517820043,
          name: 'Eric Giovanola'
        }
      };
    },

    render: function() {
      return (
        <Navbar
          brand={<Link href={getHomeUrl()}>Onolog</Link>}
          className="header"
          fixed="top"
          inverse>
          {this._renderMainMenu()}
          {this._renderAccountMenu()}
          {this._renderLoginLink()}
        </Navbar>
      );
    },

    _renderAccountMenu: function() {
      var user = this.props.user;
      if (!user || !user.id) {
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
          <NavItem menu={menu}>
            <span className="accountName ellipses hidden-phone">
              {user.name}
            </span>
          </NavItem>
        </Nav>
      );
    },

    _renderMainMenu: function() {
      var user = this.props.user;
      if (user && user.id) {
        return (
          <Nav>
            <NavItem href={getHomeUrl()}>
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
    _renderLoginLink: function() {
      var user = this.props.user;
      if (!user || !user.id) {
        return (
          <Nav right>
            <NavItem href="#">
              Sign In
            </NavItem>
          </Nav>
        );
      }
    }
  });

});
