var React = require('react');

/**
 * BaseCalendarWeek.react
 * @jsx React.DOM
 *
 * Renders a single row in the calendar grid (ie: one week)
 */
var BaseCalendarWeek = React.createClass({
  displayName: 'BaseCalendarWeek',
  
  render: function() {
    return <tr>{this.props.children}</tr>;
  }
});

module.exports = BaseCalendarWeek;
