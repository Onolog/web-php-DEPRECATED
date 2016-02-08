import React from 'react';

/**
 * MenuHeader.react
 *
 * Header used in a dropdown menu.
 */
const MenuHeader = React.createClass({
  displayName: 'MenuHeader',

  propTypes: {
    label: React.PropTypes.string.isRequired,
  },

  render: function() {
    return (
      <li className="dropdown-header">
        {this.props.label}
      </li>
    );
  },
});

module.exports = MenuHeader;
