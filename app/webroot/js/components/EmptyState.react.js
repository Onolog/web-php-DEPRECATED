import React from 'react';

/**
 * EmptyState.react
 *
 * Standardized component for when there's no data to display.
 */
const EmptyState = React.createClass({
  displayName: 'EmptyState',

  render: function() {
    return (
      <div className="emptyState">
        {this.props.children}
      </div>
    );
  },
});

module.exports = EmptyState;
