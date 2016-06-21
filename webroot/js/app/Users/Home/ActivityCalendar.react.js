import moment from 'moment';
import React from 'react';

import ActivityCalendarDay from './ActivityCalendarDay.react';
import BaseCalendar from 'components/Calendar/BaseCalendar.react';
import BaseCalendarWeek from 'components/Calendar/BaseCalendarWeek.react';

import calendarGrid from 'utils/calendarGrid';

/**
 * ActivityCalendar.react
 */
const ActivityCalendar = React.createClass({
  displayName: 'ActivityCalendar',

  propTypes: {
    activities: React.PropTypes.array.isRequired,
    date: React.PropTypes.instanceOf(Date).isRequired,
  },

  render() {
    const grid = calendarGrid(
      this.props.date.getMonth(),
      this.props.date.getFullYear()
    );

    return (
      <BaseCalendar className="calendar">
        {grid.map(this._renderWeek)}
      </BaseCalendar>
    );
  },

  _renderWeek(week, idx) {
    this._weeklyMileage = 0;
    return (
      <BaseCalendarWeek key={idx}>
        {week.map(this._renderDay)}
      </BaseCalendarWeek>
    );
  },

  _renderDay(day, idx) {
    const dateObject = day.date;

    let activities = this.props.activities.filter(activity => (
      moment(dateObject).isSame(activity.start_date, 'day')
    ));

    if (activities.length) {
      activities.forEach(activity => {
        this._weeklyMileage += activity.distance;
      });
    }

    return (
      <ActivityCalendarDay
        activities={activities}
        date={dateObject}
        key={idx}
        month={this.props.date.getMonth()}
        weeklyMileage={this._weeklyMileage}
      />
    );
  },
});

module.exports = ActivityCalendar;
