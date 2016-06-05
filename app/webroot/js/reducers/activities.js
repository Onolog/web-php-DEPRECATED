import ActionTypes from 'constants/ActionTypes';

const activities = (activities=[], action) => {
  switch (action.type) {
    case ActionTypes.ACTIVITIES_FETCH_SUCCESS:
      // TODO: Append fetched activities so we don't fetch the same ones
      // multiple times.
      return action.activities;
    case ActionTypes.ACTIVITY_ADD_SUCCESS:
      return [...activities, action.activity];
    case ActionTypes.ACTIVITY_DELETE_SUCCESS:
      return activities.filter((a) => a.id !== action.id);
    case ActionTypes.ACTIVITY_UPDATE_SUCCESS:
      const {activity} = action;
      return activities.slice().map(a => a.id === activity.id ? activity : a);
    case ActionTypes.ACTIVITY_VIEW_SUCCESS:
    default:
      return activities;
  }
};

export default activities;
