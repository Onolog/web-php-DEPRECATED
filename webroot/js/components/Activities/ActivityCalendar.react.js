import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import ActivityCalendarDay from './ActivityCalendarDay.react';
import BaseCalendar from 'components/Calendar/BaseCalendar.react';
import BaseCalendarWeek from 'components/Calendar/BaseCalendarWeek.react';

import calendarGrid from 'utils/calendarGrid';

import './css/ActivityCalendar.css';

/**
 * ActivityCalendar.react
 */
class ActivityCalendar extends React.Component {
  static displayName = 'ActivityCalendar';

  static propTypes = {
    activities: PropTypes.array.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  };

  render() {
    const {date} = this.props;
    const grid = calendarGrid(date.getMonth(), date.getFullYear());

    return (
      <BaseCalendar className="calendar">
        {grid.map(this._renderWeek)}
      </BaseCalendar>
    );
  }

  _renderWeek = (week, idx) => {
    this._weeklyMileage = 0;
    return (
      <BaseCalendarWeek key={idx}>
        {week.map(this._renderDay)}
      </BaseCalendarWeek>
    );
  };

  _renderDay = (day, idx) => {
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
  };
}

export default ActivityCalendar;
