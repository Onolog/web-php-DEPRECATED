define([

  'lib/react/react',
  'lib/react/jsx!components/Button/DropdownButton.react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Menu/Menu.react',
  'lib/react/jsx!components/Menu/MenuDivider.react',
  'lib/react/jsx!components/Menu/MenuItem.react',
  'lib/react/jsx!components/Middot.react'

], function(

  React,
  DropdownButton,
  LeftRight,
  Link,
  Menu,
  MenuDivider,
  MenuItem,
  Middot

) {

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

    render: function() {
      return (
        <header className="header navbar navbar-inverse navbar-fixed-top">
          <div className="container clearfix">
            <div className="navbar-header">
              <button
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                type="button">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" href="#">
                Onolog
              </Link>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1">
              {this._renderMainMenu()}
              {this._renderAccountMenu()}
              {this._renderLoginLink()}
            </div>
          </div>
        </header>
      );
    },

    _renderAccountMenu: function() {
      var user = this.props.user;
      if (!user || !user.id) {
        return;
      }

      var menu =
        <Menu>
          <MenuItem label="Profile" />
          <MenuItem label="Settings" />
          <MenuDivider />
          <MenuItem label="Sign Out" />
        </Menu>;

      return (
        <ul className="nav navbar-nav navbar-right account">
          <li className="nav-item">
            <Link href="#">
              <span className="accountName ellipses hidden-phone">
                {user.name}
              </span>
              <i className="caret" />
            </Link>
          </li>
        </ul>
      );
    },

    _renderMainMenu: function() {
      var user = this.props.user;
      if (!user || !user.id) {
        return;
      }

      return (
        <ul className="nav navbar-nav navbar-left">
          <li className="nav-item">
            <Link href="/">
              Calendar
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/users/profile/">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/users/shoes">
              Shoes
            </Link>
          </li>
        </ul>
      );
    },

    /**
     * If there's no user info, it means the user isn't logged in. Propmt them
     * to do so.
     */
    _renderLoginLink: function() {
      var user = this.props.user;
      if (user && user.id) {
        return;
      }

      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
            <Link href="#">
              Sign In
            </Link>
          </li>
        </ul>
      );
    }
  });

});
