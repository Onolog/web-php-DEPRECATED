import React from 'react';

import Link from 'components/Link/Link.react';

/**
 * MenuItem.react
 *
 * Single menu item in a dropdown.
 */
const MenuItem = React.createClass({
  displayName: 'MenuItem',

  propTypes: {
    href: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      href: '#',
    };
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
  },
});

module.exports = MenuItem;
