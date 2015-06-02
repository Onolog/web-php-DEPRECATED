/**
 * BaseCalendarDay.react
 * @jsx React.DOM
 *
 * Renders a single day for a month-view calendar
 */
define([

  'lib/react/react',
  'utils/cx'

], function(React, cx) {

  return React.createClass({
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
            'today': this._isToday(dateObj)
          })}>
          {this.props.children}
        </td>
      );
    },

    /**
     * Determines if the date object in question corresponds to today's date
     *
     * TODO: Should I be using UTC and offsets?
     */
    _isToday: function(/*Date*/ dateObj) /*boolean*/ {
      var today = new Date();
      return (
        today.getFullYear() === dateObj.getFullYear() &&
        today.getMonth() === dateObj.getMonth() &&
        today.getDate() === dateObj.getDate()
      );
    }
  });

});