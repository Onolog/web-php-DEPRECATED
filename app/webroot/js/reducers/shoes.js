import {
  ALL_SHOES_FETCH,
  ALL_SHOES_FETCH_ERROR,
  ALL_SHOES_FETCH_SUCCESS,
  SHOE_ADD,
  SHOE_ADD_ERROR,
  SHOE_ADD_SUCCESS,
  SHOE_DELETE,
  SHOE_DELETE_ERROR,
  SHOE_DELETE_SUCCESS,
  SHOE_VIEW,
  SHOE_UPDATE,
  SHOE_UPDATE_ERROR,
  SHOE_UPDATE_SUCCESS,
  WORKOUT_ADD,
  WORKOUT_DELETE,
  WORKOUT_UPDATE,
} from 'constants/ActionTypes';

const shoes = (shoes=[], action) => {
  switch(action.type) {
    case ALL_SHOES_FETCH_SUCCESS:
      return action.shoes;
    case SHOE_ADD_SUCCESS:
      return [...shoes, action.shoe];
    case SHOE_DELETE_SUCCESS:
      return shoes.filter(shoe => shoe.id !== action.id);
    case SHOE_VIEW:
      let shoeIds = map(shoes, 'id');
      if (shoeIds.indexOf(action.shoe.id) === -1) {
        shoes = [...shoes, action.shoe];
      }
      return shoes;
    case SHOE_UPDATE_SUCCESS:
      shoes = shoes.filter(shoe => shoe.id !== action.shoe.id);
      return [...shoes, action.shoe];
    case WORKOUT_ADD:
    case WORKOUT_DELETE:
    case WORKOUT_UPDATE:
      // When activities are added, removed, or updated, this may affect the
      // mileage for the shoe associated with that activity. Update the store
      // with the new data.
      //
      // TODO: Handle these cases...
      return shoes;
    case ALL_SHOES_FETCH_ERROR:
    case SHOE_ADD_ERROR:
    case SHOE_DELETE_ERROR:
    case SHOE_UPDATE_ERROR:
      // TODO: Handle error.
      return shoes;
    case ALL_SHOES_FETCH:
    case SHOE_ADD:
    case SHOE_DELETE:
    case SHOE_UPDATE:
      // TODO: Add `isLoading` property to app state.
      return shoes;
    default:
      return shoes;
  }
};

export default shoes;
