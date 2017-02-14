import ActionTypes from 'constants/ActionTypes';

const error = (state=null, action) => {
  switch (action.type) {
    case ActionTypes.ACTIVITY_ADD_ERROR:
    case ActionTypes.SESSION_LOGIN_ERROR:
    case ActionTypes.SESSION_LOGOUT_ERROR:
      return action.error;
    case ActionTypes.ERROR_CLEAR:
      return null;
    default:
      return state;
  }
};

export default error;
