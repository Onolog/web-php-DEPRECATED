/**
 * DatepickerCalendar.react.js
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Calendar/BaseCalendar.react',
  'lib/react/jsx!components/Calendar/BaseCalendarDay.react',
  'lib/react/jsx!components/Calendar/BaseCalendarWeek.react',
  'lib/react/jsx!components/Link/Link.react',
  'utils/calendarGrid',
  'utils/cloneDate',
  'utils/cx'

], function(

  React,

  BaseCalendar,
  BaseCalendarDay,
  BaseCalendarWeek,
  Link,

  calendarGrid,
  cloneDate,
  cx

) {

  return React.createClass({
    displayName: 'DatepickerCalendar',

    propTypes: {
      date: React.PropTypes.instanceOf(Date).isRequired,
      selectedDate: React.PropTypes.instanceOf(Date)
    },
  
    render: function() {
      var grid = calendarGrid(
        this.props.date.getMonth(),
        this.props.date.getFullYear()
      );

      return (
        <BaseCalendar
          className="DatepickerCalendar"
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
          month={this.props.date.getMonth()}>
          <Link
            className={cx({
              'selected': this._isSelected(dayDate)
            })}
            href="javascript:;"
            onClick={this._onDayClick.bind(this, dayDate)}>
            {dayDate.getDate()}
          </Link>
        </BaseCalendarDay>
      );
    },

    _isSelected: function(date) {
      var selectedDate = this.props.selectedDate;
      selectedDate.setHours(0,0,0,0);
      date.setHours(0,0,0,0);

      return date.getTime() === selectedDate.getTime();
    },

    _onDayClick: function(date) {
      this.props.onChange && this.props.onChange(date);
    }
  });

});
