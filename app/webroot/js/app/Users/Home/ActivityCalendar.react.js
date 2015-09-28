var React = require('react');

var ActivityCalendarDay = require('./ActivityCalendarDay.react');
var AppPage = require('../../../components/Page/AppPage.react');
var BaseCalendar = require('../../../components/Calendar/BaseCalendar.react');
var BaseCalendarWeek = require('../../../components/Calendar/BaseCalendarWeek.react');

var calendarGrid = require('../../../utils/calendarGrid');
var isSameDay = require('../../../utils/isSameDay');
var unixTimeToDate = require('../../../utils/unixTimeToDate');

/**
 * ActivityCalendar.react
 * @jsx React.DOM
 */
var ActivityCalendar = React.createClass({
  displayName: 'ActivityCalendar',

  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired,
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
      return isSameDay(
        dateObject,
        unixTimeToDate(workout.date)
      );
    });

    if (workouts.length) {
      workouts.forEach(function(workout) {
        this._weeklyMileage += workout.distance;
      }.bind(this));
    }

    return (
      <ActivityCalendarDay
        date={dateObject}
        key={idx}
        month={this.props.date.getMonth()}
        weeklyMileage={this._weeklyMileage}
        workouts={workouts}
      />
    );
  }
});

module.exports = ActivityCalendar;
