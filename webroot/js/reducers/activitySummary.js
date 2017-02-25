import {PROFILE_FETCH_SUCCESS} from 'constants/ActionTypes';

const activitySummary = (activitySummary={}, action) => {
  switch (action.type) {
    case PROFILE_FETCH_SUCCESS:
      return action.activitySummary;
    default:
      return activitySummary;
  }
};

export default activitySummary;
