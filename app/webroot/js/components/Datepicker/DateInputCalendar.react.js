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

  /**
   * DateInputCalendar.react.js
   * @jsx React.DOM
   */
  return React.createClass({
    displayName: 'DatePickerCalendar',

    propTypes: {
      /**
       * The date corresponding to the month/year being displayed by the
       * calendar.
       */
      calendarDate: React.PropTypes.instanceOf(Date).isRequired,
      /**
       * The selected date for the DateInput component.
       */
      date: React.PropTypes.instanceOf(Date)
    },
  
    render: function() {
      var grid = calendarGrid(
        this.props.calendarDate.getMonth(),
        this.props.calendarDate.getFullYear()
      );

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
          month={this.props.calendarDate.getMonth()}>
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

    _isSelected: function(/*Date*/ date) {
      var selectedDate = cloneDate(this.props.date);
      selectedDate.setHours(0,0,0,0);

      date = cloneDate(date);
      date.setHours(0,0,0,0);

      return date.getTime() === selectedDate.getTime();
    },

    _onDayClick: function(/*Date*/ newDate) {
      var date = cloneDate(this.props.date);

      // `newDate` doesn't contain time information (hh:mm:ss) so set the
      // year/month/date info on a copy of the existing selected date, which
      // does contain the correct time data.
      date.setFullYear(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate()
      );

      this.props.onChange && this.props.onChange(date);
    }
  });

});
