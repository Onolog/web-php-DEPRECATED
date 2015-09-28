var React = require('react');

var BaseCalendar = require('./BaseCalendar.react');
var BaseCalendarDay = require('./BaseCalendarDay.react');
var BaseCalendarWeek = require('./BaseCalendarWeek.react');
var CalendarDate = require('./CalendarDate.react');

var calendarGrid = require('../../utils/calendarGrid');

/**
 * Renders a calendar view for a single month
 */
var Calendar = React.createClass({
  displayName: 'Calendar',

  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired
  },

  render: function() {
    var grid = calendarGrid(
      this.props.date.getMonth(),
      this.props.date.getFullYear()
    );

    return (
      <BaseCalendar className="calendar">
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
    var date = day.date;
    return (
      <BaseCalendarDay
        date={date}
        key={idx}
        month={this.props.date.getMonth()}>
        <CalendarDate date={date} />
      </BaseCalendarDay>
    );
  }
});

module.exports = Calendar;
