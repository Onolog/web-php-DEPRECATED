import {
  ACTIVITIES_FETCH_SUCCESS,
  ACTIVITY_ADD_SUCCESS,
  ACTIVITY_DELETE_SUCCESS,
  ACTIVITY_UPDATE_SUCCESS,
  ALL_SHOES_FETCH_SUCCESS,
  PROFILE_FETCH_SUCCESS,
  SHOE_ADD_SUCCESS,
  SHOE_DELETE_SUCCESS,
  SHOE_UPDATE_SUCCESS,
} from 'constants/ActionTypes';

const shoe = (state=[], action) => {
  switch(action.type) {
    case SHOE_UPDATE_SUCCESS:
    case ACTIVITY_ADD_SUCCESS:
    case ACTIVITY_DELETE_SUCCESS:
    case ACTIVITY_UPDATE_SUCCESS:
      const {shoe} = action;
      return state.id === shoe.id ? {...state, ...shoe} : state;
    default:
      return state;
  }
};

const shoes = (state=[], action) => {
  switch(action.type) {
    case ACTIVITIES_FETCH_SUCCESS:
    case ALL_SHOES_FETCH_SUCCESS:
    case PROFILE_FETCH_SUCCESS:
      return action.shoes;
    case SHOE_ADD_SUCCESS:
      return [...state, action.shoe];
    case SHOE_DELETE_SUCCESS:
      return state.filter(shoe => shoe.id !== action.id);
    case SHOE_UPDATE_SUCCESS:
      return state.map(s => shoe(s, action));
    case ACTIVITY_ADD_SUCCESS:
    case ACTIVITY_DELETE_SUCCESS:
    case ACTIVITY_UPDATE_SUCCESS:
      if (action.shoe) {
        return state.map(s => shoe(s, action));
      }
      return state;
    default:
      return state;
  }
};

export default shoes;
