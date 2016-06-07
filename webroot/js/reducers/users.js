import {USER_SETTINGS_SAVE_SUCCESS} from 'constants/ActionTypes';

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
    case USER_SETTINGS_SAVE_SUCCESS:
      return state.map(u => user(u, action));
    default:
      return state;
  }
};

export default users;