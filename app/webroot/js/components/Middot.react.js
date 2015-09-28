var React = require('react');

/**
 * Middot.react
 * @jsx React.DOM
 *
 * Renders a styled middot character within a span
 */
var Middot = React.createClass({
  displayName: 'Middot',
  render: function() {
    return <span className="middot">&middot;</span>;
  }
});

module.exports = Middot;
