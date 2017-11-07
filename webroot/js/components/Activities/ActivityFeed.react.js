import cx from 'classnames';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';

import EmptyState from 'components/EmptyState.react';

import './css/ActivityFeed.scss';

const DATE_FORMAT = 'dddd, MMMM Do, YYYY';

const ActivityFeedItem = ({activity, className}) => {
  const {distance, duration, start_date, timezone} = activity;

  return (
    <div className={cx('activity-feed-item')}>
      <div>{moment.tz(start_date, timezone).format(DATE_FORMAT)}</div>
      <div>{distance}</div>
      <div>{duration}</div>
    </div>
  );
};

const ActivityFeed = ({activities, className}) => {
  if (!activities.length) {
    return (
      <EmptyState>
        No recent activities.
      </EmptyState>
    );
  }

  return (
    <div className={cx('activity-feed', className)}>
      {activities.map((a) => (
        <ActivityFeedItem
          activity={a}
          key={a.id}
        />
      ))}
    </div>
  );
};

ActivityFeed.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default ActivityFeed;
