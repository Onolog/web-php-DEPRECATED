var React = require('react');

var cx = require('classnames');

/**
 * CalendarDate.react
 *
 * Renders the date in a single calendar cell.
 */
var CalendarDate = React.createClass({
  displayName: 'CalendarDate',

  propTypes: {
    /**
     * Date object for the day being rendered
     */
    date: React.PropTypes.instanceOf(Date).isRequired,
  },

  render: function() {
    return (
      <h3>{this.props.date.getDate()}</h3>
    );
  }
});

module.exports = CalendarDate;
