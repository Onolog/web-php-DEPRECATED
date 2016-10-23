import {
  ACTIVITIES_FETCH_SUCCESS,
  PROFILE_FETCH_SUCCESS,
  SETTINGS_FETCH_SUCCESS,
  USER_SETTINGS_SAVE_SUCCESS,
} from 'constants/ActionTypes';

const user = (state={}, action) => {
  switch (action.type) {
    case USER_SETTINGS_SAVE_SUCCESS:
      return {...state, ...action.user};
    default:
      return state;
  }
};

const users = (state=[], action) => {
  switch (action.type) {
    case ACTIVITIES_FETCH_SUCCESS:
    case PROFILE_FETCH_SUCCESS:
    case SETTINGS_FETCH_SUCCESS:
      return action.users;
    case USER_SETTINGS_SAVE_SUCCESS:
      return state.map(u => user(u, action));
    default:
      return state;
  }
};

export default users;
