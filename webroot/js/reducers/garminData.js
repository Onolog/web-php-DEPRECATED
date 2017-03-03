import {GARMIN_ACTIVITY_SCRAPE_SUCCESS} from 'constants/ActionTypes';

export default (state={}, action) => {
  switch (action.type) {
    case GARMIN_ACTIVITY_SCRAPE_SUCCESS:
      return action.garminData;
    default:
      return state;
  }
};
