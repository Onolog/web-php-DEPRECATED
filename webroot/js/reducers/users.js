import {
  ACTIVITIES_FETCH_SUCCESS,
  ACTIVITY_FETCH_SUCCESS,
  PROFILE_FETCH_SUCCESS,
  SETTINGS_FETCH_SUCCESS,
  USER_SETTINGS_SAVE_SUCCESS,
} from 'constants/ActionTypes';

const users = (state=[], action) => {
  switch (action.type) {
    case ACTIVITIES_FETCH_SUCCESS:
    case ACTIVITY_FETCH_SUCCESS:
    case PROFILE_FETCH_SUCCESS:
    case SETTINGS_FETCH_SUCCESS:
    case USER_SETTINGS_SAVE_SUCCESS:
      return action.users;
    default:
      return state;
  }
};

export default users;
