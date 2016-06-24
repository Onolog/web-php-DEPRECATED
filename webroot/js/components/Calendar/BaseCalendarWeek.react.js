import React from 'react';

/**
 * BaseCalendarWeek.react
 *
 * Renders a single row in the calendar grid (ie: one week)
 */
const BaseCalendarWeek = React.createClass({
  displayName: 'BaseCalendarWeek',

  render: function() {
    return <tr>{this.props.children}</tr>;
  },
});

module.exports = BaseCalendarWeek;
