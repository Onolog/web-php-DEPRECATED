/**
 * EmptyState.react
 * @jsx React.DOM
 *
 * Standardized component for when there's no data to display.
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'EmptyState',

    propTypes: {
      message: React.PropTypes.string.isRequired
    },

    render: function() {
      return (
        <div className="emptyState">
          {this.props.message}
        </div>
      );
    }
  });

});