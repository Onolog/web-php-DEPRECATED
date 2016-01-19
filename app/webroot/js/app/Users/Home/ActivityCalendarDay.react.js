var React = require('react');

var BaseCalendarDay = require('components/Calendar/BaseCalendarDay.react');
var Button = require('components/Button/Button.react');
var CalendarDate = require('components/Calendar/CalendarDate.react');
var WorkoutAddDialog = require('./WorkoutAddDialog.react');
var WorkoutLink = require('./WorkoutLink.react');

var formatDistance = require('utils/formatDistance');

var LAST_DAY_OF_WEEK = 6; // Saturday (Sunday is 0)

/**
* ActivityCalendarDay.react
*/
var ActivityCalendarDay = React.createClass({
  displayName: 'ActivityCalendarDay',

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

module.exports = ActivityCalendarDay;
