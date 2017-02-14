import {
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGOUT_SUCCESS,
} from 'constants/ActionTypes';

const session = (session={}, action) => {
  switch (action.type) {
    case SESSION_LOGIN_SUCCESS:
    case SESSION_LOGOUT_SUCCESS:
      return action.session;
    default:
      return session;
  }
};

export default session;
