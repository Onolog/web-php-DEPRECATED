/**
 * MenuDivider.react
 * @jsx React.DOM
 *
 * Divider used in a dropdown menu.
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'MenuDivider',

    render: function() {
      return <li className="divider"></li>;
    }
  });

});
