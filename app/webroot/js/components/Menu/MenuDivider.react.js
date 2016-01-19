var React = require('react');

/**
 * MenuDivider.react
 *
 * Divider used in a dropdown menu.
 */
var MenuDivider = React.createClass({
  displayName: 'MenuDivider',

  render: function() {
    return <li className="divider"></li>;
  }
});

module.exports = MenuDivider;
