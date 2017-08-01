import React from 'react';

/**
 * EmptyState.react
 *
 * Standardized component for when there's no data to display.
 */
class EmptyState extends React.Component {
  static displayName = 'EmptyState';

  render() {
    return (
      <div className="emptyState">
        {this.props.children}
      </div>
    );
  }
}

module.exports = EmptyState;
