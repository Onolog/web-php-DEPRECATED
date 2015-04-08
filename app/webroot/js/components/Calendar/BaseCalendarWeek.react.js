/**
 * BaseCalendarWeek.react
 * @jsx React.DOM
 *
 * Renders a single row in the calendar grid (ie: one week)
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'BaseCalendarWeek',
    
    render: function() {
      return <tr>{this.props.children}</tr>;
    }
  });

});