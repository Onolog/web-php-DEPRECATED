/**
 * UserCalendar.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',

  'lib/react/jsx!app/Users/Calendar/UserCalendarDay.react',
  'lib/react/jsx!components/Calendar/BaseCalendar.react',
  'lib/react/jsx!components/Calendar/BaseCalendarWeek.react',

  'stores/AlertStore',
  'stores/WorkoutsStore',

  'utils/calendarGrid'

], function(

  React,

  UserCalendarDay,
  BaseCalendar,
  BaseCalendarWeek,

  AlertStore,
  WorkoutsStore,

  calendarGrid

) {

  return React.createClass({
    displayName: 'UserCalendar',

    propTypes: {
      date: React.PropTypes.instanceOf(Date).isRequired,
      /**
       * Array of the user's friends for display in the workout fields view
       */
      friends: React.PropTypes.array,
      /**
       * Array of the user's shoes for display in the workout fields view
       */
      shoes: React.PropTypes.array,
      workouts: React.PropTypes.array,
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
      this._weeklyMileage = 0;
      return (
        <BaseCalendarWeek key={idx}>
          {week.map(this._renderDay)}
        </BaseCalendarWeek>
      );
    },

    _renderDay: function(day, idx) {
      var dateObject = day.date;
      var workouts = this.props.workouts || [];

      workouts = workouts.filter(function(workout) {
        return workout.date === (dateObject.getTime() / 1000);
      });

      if (workouts.length) {
        workouts.forEach(function(workout) {
          this._weeklyMileage += workout.distance;
        }.bind(this));
      }

      return (
        <UserCalendarDay
          date={dateObject}
          key={idx}
          month={this.props.date.getMonth()}
          shoes={this.props.shoes}
          weeklyMileage={this._weeklyMileage}
          workouts={workouts}
        />
      );
    }
  });

});
