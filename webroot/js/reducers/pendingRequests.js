import ActionTypes from 'constants/ActionTypes';

export default (pendingRequests={}, action) => {
  let newState;

  switch (action.type) {
    case ActionTypes.ACTIVITIES_FETCH:
    case ActionTypes.ACTIVITY_ADD:
    case ActionTypes.ACTIVITY_DELETE:
    case ActionTypes.ACTIVITY_FETCH:
    case ActionTypes.ACTIVITY_UPDATE:
    case ActionTypes.ACTIVITY_VIEW:
    case ActionTypes.ALL_SHOES_FETCH:
    case ActionTypes.BRANDS_FETCH:
    case ActionTypes.GARMIN_ACTIVITY_FETCH:
    case ActionTypes.PROFILE_FETCH:
    case ActionTypes.SESSION_LOGIN:
    case ActionTypes.SESSION_LOGOUT:
    case ActionTypes.SETTINGS_FETCH:
    case ActionTypes.SHOE_ADD:
    case ActionTypes.SHOE_DELETE:
    case ActionTypes.SHOE_UPDATE:
    case ActionTypes.SHOE_VIEW:
    case ActionTypes.USER_DATA_FETCH:
    case ActionTypes.USER_SETTINGS_SAVE:
      newState = {...pendingRequests};
      newState[action.type] = true;
      return newState;
    case ActionTypes.ACTIVITIES_FETCH_ERROR:
    case ActionTypes.ACTIVITIES_FETCH_SUCCESS:
    case ActionTypes.ACTIVITY_ADD_ERROR:
    case ActionTypes.ACTIVITY_ADD_SUCCESS:
    case ActionTypes.ACTIVITY_DELETE_ERROR:
    case ActionTypes.ACTIVITY_DELETE_SUCCESS:
    case ActionTypes.ACTIVITY_FETCH_ERROR:
    case ActionTypes.ACTIVITY_FETCH_SUCCESS:
    case ActionTypes.ACTIVITY_UPDATE_ERROR:
    case ActionTypes.ACTIVITY_UPDATE_SUCCESS:
    case ActionTypes.ACTIVITY_VIEW_ERROR:
    case ActionTypes.ACTIVITY_VIEW_SUCCESS:
    case ActionTypes.ALL_SHOES_FETCH_ERROR:
    case ActionTypes.ALL_SHOES_FETCH_SUCCESS:
    case ActionTypes.BRANDS_FETCH_ERROR:
    case ActionTypes.BRANDS_FETCH_SUCCESS:
    case ActionTypes.GARMIN_ACTIVITY_FETCH_ERROR:
    case ActionTypes.GARMIN_ACTIVITY_FETCH_SUCCESS:
    case ActionTypes.PROFILE_FETCH_ERROR:
    case ActionTypes.PROFILE_FETCH_SUCCESS:
    case ActionTypes.SESSION_LOGIN_ERROR:
    case ActionTypes.SESSION_LOGIN_SUCCESS:
    case ActionTypes.SESSION_LOGOUT_ERROR:
    case ActionTypes.SESSION_LOGOUT_SUCCESS:
    case ActionTypes.SETTINGS_FETCH_ERROR:
    case ActionTypes.SETTINGS_FETCH_SUCCESS:
    case ActionTypes.SHOE_ADD_ERROR:
    case ActionTypes.SHOE_ADD_SUCCESS:
    case ActionTypes.SHOE_DELETE_ERROR:
    case ActionTypes.SHOE_DELETE_SUCCESS:
    case ActionTypes.SHOE_UPDATE_ERROR:
    case ActionTypes.SHOE_UPDATE_SUCCESS:
    case ActionTypes.SHOE_VIEW_ERROR:
    case ActionTypes.SHOE_VIEW_SUCCESS:
    case ActionTypes.USER_DATA_FETCH_ERROR:
    case ActionTypes.USER_DATA_FETCH_SUCCESS:
    case ActionTypes.USER_SETTINGS_SAVE_ERROR:
    case ActionTypes.USER_SETTINGS_SAVE_SUCCESS:
      // Remove 'success' or 'error' from the action type.
      const originalAction = action.type.split('-').slice(0, -1).join('-');
      newState = {...pendingRequests};
      newState[originalAction] = false;
      return newState;
    default:
      return pendingRequests;
  }
};
