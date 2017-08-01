import {find} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import Activity from 'components/Activities/Activity.react';

const mapStateToProps = ({activities, shoes, users}) => {
  return {
    activities,
    shoes,
    users,
  };
};

const ActivityContainer = ({activities, id, shoes, users}) => {
  const activity = find(activities, {id});
  const activityProps = {
    activity,
    athlete: find(users, {id: activity.user_id}),
    shoe: find(shoes, {id: activity.shoe_id}),
  };

  return <Activity {...activityProps} />;
};

ActivityContainer.propTypes = {
  activities: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  shoes: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

module.exports = connect(mapStateToProps)(ActivityContainer);
