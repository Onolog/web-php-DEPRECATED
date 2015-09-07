/**
 * UserCalendarDay.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Users/Home/WorkoutAddDialog.react',
  'lib/react/jsx!app/Users/Home/WorkoutLink.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Calendar/BaseCalendarDay.react',
  'lib/react/jsx!components/Calendar/CalendarDate.react',
  'utils/formatDistance'

], function(

  React,
  WorkoutAddDialog,
  WorkoutLink,
  Button,
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
            <WorkoutAddDialog
              date={dateObject}
              trigger={
                <Button
                  glyph="plus"
                  className="add"
                  use="default"
                  size="xsmall"
                  tooltip={{
                    title: 'Add workout',
                    placement: 'right'
                  }}
                />
              }
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

      return workouts.map(function(/*object*/ workout) {
        return (
          <WorkoutLink
            key={workout.id}
            workout={workout}
          />
        );
      });
    },

    _renderWeeklyTotal: function(dateObject) {
      if (dateObject.getDay() === LAST_DAY_OF_WEEK) {
        return (
          <div className="total">
            <span className="distance">
              {formatDistance(this.props.weeklyMileage)}
            </span> mi
          </div>
        );
      }
    }
  });

});
