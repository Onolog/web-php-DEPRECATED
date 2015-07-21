/**
 * MenuHeader.react
 * @jsx React.DOM
 *
 * Header used in a dropdown menu.
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'MenuHeader',

    propTypes: {
      label: React.PropTypes.string.isRequired
    },

    render: function() {
      return (
        <li className="dropdown-header">
          {this.props.label}
        </li>
      );
    }
  });

});
