/**
 * MenuItem.react
 * @jsx React.DOM
 *
 * Single menu item in a dropdown.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Link/Link.react',

], function(

  React,
  Link

) {

  return React.createClass({
    displayName: 'MenuItem',

    propTypes: {
      href: React.PropTypes.string,
      label: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func
    },

    getDefaultProps: function() {
      return {
        href: 'javascript:;'
      }
    },

    render: function() {
      return (
        <li className="menuItem">
          <Link
            href={this.props.href}
            onClick={this._handleClick}>
            {this.props.label}
          </Link>
        </li>
      );
    },

    _handleClick: function() {
      return this.props.onClick && this.props.onClick();
    }
  });

});
