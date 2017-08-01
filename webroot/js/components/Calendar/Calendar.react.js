var PropTypes = require('prop-types');
var React = require('react');

var BaseCalendar = require('./BaseCalendar.react');
var BaseCalendarDay = require('./BaseCalendarDay.react');
var BaseCalendarWeek = require('./BaseCalendarWeek.react');
var CalendarDate = require('./CalendarDate.react');

var calendarGrid = require('utils/calendarGrid');

/**
 * Renders a calendar view for a single month
 */
class Calendar extends React.Component {
  static displayName = 'Calendar';

  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  };

  render() {
    var grid = calendarGrid(
      this.props.date.getMonth(),
      this.props.date.getFullYear()
    );

    return (
      <BaseCalendar className="calendar">
        {grid.map(this._renderWeek)}
      </BaseCalendar>
    );
  }

  _renderWeek = (week, idx) => {
    return (
      <BaseCalendarWeek key={idx}>
        {week.map(this._renderDay)}
      </BaseCalendarWeek>
    );
  };

  _renderDay = (day, idx) => {
    var date = day.date;
    return (
      <BaseCalendarDay
        date={date}
        key={idx}
        month={this.props.date.getMonth()}>
        <CalendarDate date={date} />
      </BaseCalendarDay>
    );
  };
}

module.exports = Calendar;
