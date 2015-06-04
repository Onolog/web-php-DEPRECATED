/**
 * UserCalendarDay.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Users/Calendar/WorkoutAddButton.react',
  'lib/react/jsx!app/Users/Calendar/WorkoutLink.react',
  'lib/react/jsx!components/Calendar/BaseCalendarDay.react',
  'lib/react/jsx!components/Calendar/CalendarDate.react',
  'utils/formatDistance'

], function(

  React,
  WorkoutAddButton,
  WorkoutLink,
  BaseCalendarDay,
  CalendarDate,
  formatDistance

) {

  var LAST_DAY_OF_WEEK = 6; // Saturday (Sunday is 0)

  return React.createClass({
    displayName: 'UserCalendarDay',

    propTypes: {
      /**
       * The date object for the day being rendered
       */
      date: React.PropTypes.instanceOf(Date),
      /**
       * UTC month, ie: August === 7
       */
      month: React.PropTypes.number,
      /**
       * Array of the user's shoes for display in the workout fields view
       */
      shoes: React.PropTypes.array,
      weeklyMileage: React.PropTypes.number,
      /**
       * Workouts for the given day
       */
      workouts: React.PropTypes.array,
    },

    render: function() {
      var dateObject = this.props.date;
      return (
        <BaseCalendarDay
          date={dateObject}
          month={this.props.month}>
          <div className="wrapper">
            <CalendarDate date={dateObject} />
            {this._renderWorkouts()}
            <WorkoutAddButton
              dateObject={dateObject}
              shoes={this.props.shoes}
            />
            {this._renderWeeklyTotal(dateObject)}
          </div>
        </BaseCalendarDay>
      );
    },

    _renderWorkouts: function() /*?object*/ {
      var workouts = this.props.workouts;
      if (!workouts.length) {
        return;
      }

      var dateObj = this.props.date;
      return workouts.map(function(/*object*/ workout) {
        return (
          <WorkoutLink
            key={workout.id}
            shoes={this.props.shoes}
            workout={workout}
          />
        );
      }.bind(this));
    },

    _renderWeeklyTotal: function(dateObject) {
      if (dateObject.getUTCDay() !== LAST_DAY_OF_WEEK) {
        return null;
      }
      return (
        <div className="total">
          <span className="distance">
            {formatDistance(this.props.weeklyMileage)}
          </span> mi
        </div>
      );
    }
  });

});
