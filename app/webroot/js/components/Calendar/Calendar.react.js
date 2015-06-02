/**
 * Renders a calendar view for a single month
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Calendar/BaseCalendar.react',
  'lib/react/jsx!components/Calendar/BaseCalendarDay.react',
  'lib/react/jsx!components/Calendar/BaseCalendarWeek.react',
  'lib/react/jsx!components/Calendar/CalendarDate.react',
  'utils/calendarGrid'

], function(

  React,

  BaseCalendar,
  BaseCalendarDay,
  BaseCalendarWeek,
  CalendarDate,

  calendarGrid

) {

  return React.createClass({
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

});
