import {
  ACTIVITIES_FETCH_SUCCESS,
  ALL_SHOES_FETCH_SUCCESS,
  SHOE_ADD_SUCCESS,
  SHOE_DELETE_SUCCESS,
  SHOE_UPDATE_SUCCESS,
  WORKOUT_ADD,
  WORKOUT_DELETE,
  WORKOUT_UPDATE,
} from 'constants/ActionTypes';

const shoe = (state=[], action) => {
  switch(action.type) {
    case SHOE_UPDATE_SUCCESS:
      return {...state, ...action.shoe};
    default:
      return state;
  }
};

const shoes = (state=[], action) => {
  switch(action.type) {
    case ALL_SHOES_FETCH_SUCCESS:
      return action.shoes;
    case SHOE_ADD_SUCCESS:
      return [...state, action.shoe];
    case SHOE_DELETE_SUCCESS:
      return state.filter(shoe => shoe.id !== action.id);
    case SHOE_UPDATE_SUCCESS:
      return state.map(s => shoe(s, action));
    case ACTIVITIES_FETCH_SUCCESS:
      // TODO: Is this necessary or just do an initial fetch of all shoes?
      return action.shoes;
    case WORKOUT_ADD:
    case WORKOUT_DELETE:
    case WORKOUT_UPDATE:
      // When activities are added, removed, or updated, this may affect the
      // mileage for the shoe associated with that activity. Update the store
      // with the new data.
      //
      // TODO: Handle these cases...
      return state;
    default:
      return state;
  }
};

export default shoes;
