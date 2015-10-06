var moment = require('moment');
var React = require('react');

var BaseCalendar = require('../Calendar/BaseCalendar.react');
var BaseCalendarDay = require('../Calendar/BaseCalendarDay.react');
var BaseCalendarWeek = require('../Calendar/BaseCalendarWeek.react');
var Link = require('../Link/Link.react');

var calendarGrid = require('../../utils/calendarGrid');
var cloneDate = require('../../utils/cloneDate');
var cx = require('classnames');

/**
 * DateInputCalendar.react.js
 * @jsx React.DOM
 */
var DateInputCalendar = React.createClass({
  displayName: 'DateInputCalendar',

  propTypes: {
    /**
     * The month being displayed by the calendar.
     */
    month: React.PropTypes.number.isRequired,
    /**
     * The selected date for the DateInput component.
     */
    selectedDate: React.PropTypes.instanceOf(Date).isRequired,
    /**
     * The year being displayed by the calendar.
     */
    year: React.PropTypes.number.isRequired
  },

  render: function() {
    var grid = calendarGrid(this.props.month, this.props.year);

    return (
      <BaseCalendar
        className="DateInputCalendar"
        headerFormat="dd">
        {grid.map(this._renderWeek)}
      </BaseCalendar>
    );
  },

  _renderWeek: function(week, idx) {
    return (
      <BaseCalendarWeek key={idx}>
        {week.map(this._renderDay)}
      </BaseCalendarWeek>
    );
  },

  _renderDay: function(day, idx) {
    var dayDate = day.date;
    return (
      <BaseCalendarDay
        date={dayDate}
        key={idx}
        month={this.props.month}>
        <Link
          className={cx({
            'selected': moment(dayDate).isSame(this.props.selectedDate, 'day')
          })}
          href="#"
          onClick={this._onDayClick.bind(this, dayDate)}>
          {dayDate.getDate()}
        </Link>
      </BaseCalendarDay>
    );
  },

  _onDayClick: function(/*Date*/ selectedDate, evt) {
    evt.preventDefault();
    this.props.onChange && this.props.onChange({
      date: selectedDate.getDate(),
      months: selectedDate.getMonth(),
      years: selectedDate.getFullYear()
    });
  }
});

module.exports = DateInputCalendar;
