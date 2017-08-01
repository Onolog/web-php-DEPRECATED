import React from 'react';

/**
 * Middot.react
 *
 * Renders a styled middot character within a span
 */
class Middot extends React.Component {
  static displayName = 'Middot';

  render() {
    return <span className="middot">&middot;</span>;
  }
}

module.exports = Middot;
