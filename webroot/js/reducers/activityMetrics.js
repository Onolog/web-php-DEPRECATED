import ActionTypes from 'constants/ActionTypes';

const activityMetrics = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.ACTIVITY_FETCH_SUCCESS:
      return action.activityMetrics;
    default:
      return state || [];
  }
};

export default activityMetrics;
