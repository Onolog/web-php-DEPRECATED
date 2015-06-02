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
  'utils/cx'

], function(

  React,

  BaseCalendar,
  BaseCalendarDay,
  BaseCalendarWeek,
  Link,

  calendarGrid,
  cx

) {

  return React.createClass({
    displayName: 'DatepickerCalendar',

    propTypes: {
      month: React.PropTypes.number.isRequired,
      selectedDate: React.PropTypes.instanceOf(Date),
      year: React.PropTypes.number.isRequired
    },
  
    render: function() {
      var grid = calendarGrid(this.props.month, this.props.year);  
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
      var date = day.date;
      return (
        <BaseCalendarDay
          date={date}
          key={idx}
          month={this.props.month}>
          <Link
            className={cx({
              'selected': this._isSelected(date)
            })}
            href="javascript:;"
            onClick={this._onDayClick.bind(this, date)}>
            {date.getDate()}
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
