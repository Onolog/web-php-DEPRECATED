import ActionTypes from 'constants/ActionTypes';

export default (state={}, action) => {
  switch (action.type) {
    case ActionTypes.ACTIVITY_MODAL_HIDE:
      // Reset data.
      return {};
    case ActionTypes.GARMIN_ACTIVITY_FETCH_SUCCESS:
      return action.garminData;
    default:
      return state;
  }
};
