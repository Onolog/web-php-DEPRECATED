import ActionTypes from 'constants/ActionTypes';

const activity = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.ACTIVITY_UPDATE_SUCCESS:
      const {activity} = action;
      return state.id === activity.id ? {...state, ...activity} : state;
    default:
      return state;
  }
};

const activities = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.ACTIVITIES_FETCH_SUCCESS:
    case ActionTypes.PROFILE_FETCH_SUCCESS:
    case ActionTypes.USER_DATA_FETCH_SUCCESS:
      // TODO: Merge fetched activities so we don't fetch the same ones
      // multiple times.
      return action.activities;
    case ActionTypes.ACTIVITY_ADD_SUCCESS:
      return [...state, action.activity];
    case ActionTypes.ACTIVITY_DELETE_SUCCESS:
      return state.filter(a => a.id !== action.id);
    case ActionTypes.ACTIVITY_UPDATE_SUCCESS:
      return state.map(a => activity(a, action));
    case ActionTypes.ACTIVITY_VIEW_SUCCESS:
      return state;
    case ActionTypes.SHOE_ACTIVITIES_FETCH_SUCCESS:
    case ActionTypes.SHOE_VIEW_SUCCESS:
      return state.concat(action.activities);
    default:
      return state || [];
  }
};

export default activities;
