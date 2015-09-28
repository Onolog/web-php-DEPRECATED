var React = require('react');

var cx = require('classnames');
var isSameDay = require('../../utils/isSameDay');

/**
 * BaseCalendarDay.react
 * @jsx React.DOM
 *
 * Renders a single day for a month-view calendar
 */
var BaseCalendarDay = React.createClass({
  displayName: 'BaseCalendarDay',

  propTypes: {
    /**
     * Date object for the day being rendered
     */
    date: React.PropTypes.instanceOf(Date).isRequired,
    /**
     * Month being displayed by the calendar
     */
    month: React.PropTypes.number.isRequired
  },

  render: function() {
    var dateObj = this.props.date;
    var month = dateObj.getMonth();
    var calMonth = this.props.month;
    var lastMonth = calMonth === 0 ? 11 : calMonth - 1;
    var nextMonth = calMonth === 11 ? 0 : calMonth + 1;

    return (
      <td
        className={cx({
          'lastMonth': month === lastMonth,
          'nextMonth': month === nextMonth,
          'today': isSameDay(dateObj, new Date())
        })}>
        {this.props.children}
      </td>
    );
  }
});

module.exports = BaseCalendarDay;
