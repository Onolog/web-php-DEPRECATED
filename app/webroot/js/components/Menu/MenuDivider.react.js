import React from 'react';

/**
 * MenuDivider.react
 *
 * Divider used in a dropdown menu.
 */
const MenuDivider = React.createClass({
  displayName: 'MenuDivider',

  render: function() {
    return <li className="divider" />;
  },
});

module.exports = MenuDivider;
