var React = require('react');

/**
 * EmptyState.react
 *
 * Standardized component for when there's no data to display.
 */
var EmptyState = React.createClass({
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

module.exports = EmptyState;
