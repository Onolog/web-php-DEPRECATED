/**
 * Renders a calendar view for a single month
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Calendar/BaseCalendar.react',
  'lib/react/jsx!components/Calendar/BaseCalendarDay.react',
  'lib/react/jsx!components/Calendar/BaseCalendarWeek.react',
  'utils/calendarGrid'

], function(

  React,

  BaseCalendar,
  BaseCalendarDay,
  BaseCalendarWeek,

  calendarGrid

) {

  return React.createClass({
    displayName: 'Calendar',

    propTypes: {
      month: React.PropTypes.number.isRequired,
      year: React.PropTypes.number.isRequired
    },
  
    render: function() {
      this.key = 0;
      var grid = calendarGrid(this.props.month, this.props.year);
  
      weeks = grid.map(function(week) {
        var days = week.map(this._renderDay);
        this.key++;
        return <BaseCalendarWeek key={this.key}>{days}</BaseCalendarWeek>;
      }.bind(this));
  
      return <BaseCalendar>{weeks}</BaseCalendar>;
    },
  
    _renderDay: function(day) {
      var date = day.date;
      return (
        <BaseCalendarDay
          date={date}
          key={date.getUTCDate()}
          month={this.props.month}
        />
      );
    }
  });

});
