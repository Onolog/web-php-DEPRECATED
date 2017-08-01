var moment = require('moment');
var PropTypes = require('prop-types');
var React = require('react');

var BaseCalendar = require('components/Calendar/BaseCalendar.react');
var BaseCalendarDay = require('components/Calendar/BaseCalendarDay.react');
var BaseCalendarWeek = require('components/Calendar/BaseCalendarWeek.react');
var Link = require('components/Link/Link.react');

var calendarGrid = require('utils/calendarGrid');
var cx = require('classnames');

/**
 * DateInputCalendar.react.js
 */
class DateInputCalendar extends React.Component {
  static displayName = 'DateInputCalendar';

  static propTypes = {
    /**
     * The month being displayed by the calendar.
     */
    month: PropTypes.number.isRequired,
    /**
     * The selected date for the DateInput component.
     */
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    /**
     * The year being displayed by the calendar.
     */
    year: PropTypes.number.isRequired,
  };

  render() {
    var grid = calendarGrid(this.props.month, this.props.year);

    return (
      <BaseCalendar
        className="DateInputCalendar"
        headerFormat="dd">
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
    var dayDate = day.date;
    return (
      <BaseCalendarDay
        date={dayDate}
        key={idx}
        month={this.props.month}>
        <Link
          className={cx({
            'selected': moment(dayDate).isSame(this.props.selectedDate, 'day'),
          })}
          href="#"
          onClick={this._onDayClick.bind(this, dayDate)}>
          {dayDate.getDate()}
        </Link>
      </BaseCalendarDay>
    );
  };

  _onDayClick = (/*Date*/ selectedDate, evt) => {
    evt.preventDefault();
    this.props.onChange && this.props.onChange({
      date: selectedDate.getDate(),
      months: selectedDate.getMonth(),
      years: selectedDate.getFullYear(),
    });
  };
}

module.exports = DateInputCalendar;
