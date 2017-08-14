import ActionTypes from 'constants/ActionTypes';

const shoe = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.SHOE_UPDATE_SUCCESS:
    case ActionTypes.ACTIVITY_ADD_SUCCESS:
    case ActionTypes.ACTIVITY_DELETE_SUCCESS:
    case ActionTypes.ACTIVITY_UPDATE_SUCCESS:
    case ActionTypes.SHOE_VIEW_SUCCESS:
      const {shoe} = action;
      return state.id === shoe.id ? {...state, ...shoe} : state;
    default:
      return state;
  }
};

const shoes = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.ACTIVITIES_FETCH_SUCCESS:
    case ActionTypes.ACTIVITY_FETCH_SUCCESS:
    case ActionTypes.ALL_SHOES_FETCH_SUCCESS:
    case ActionTypes.USER_DATA_FETCH_SUCCESS:
      return action.shoes;
    case ActionTypes.SHOE_ADD_SUCCESS:
      return [...state, action.shoe];
    case ActionTypes.SHOE_DELETE_SUCCESS:
      return state.filter(shoe => shoe.id !== action.id);
    case ActionTypes.SHOE_UPDATE_SUCCESS:
    case ActionTypes.SHOE_VIEW_SUCCESS:
      return state.map(s => shoe(s, action));
    case ActionTypes.ACTIVITY_ADD_SUCCESS:
    case ActionTypes.ACTIVITY_DELETE_SUCCESS:
    case ActionTypes.ACTIVITY_UPDATE_SUCCESS:
      if (action.shoe) {
        return state.map(s => shoe(s, action));
      }
      return state;
    default:
      return state || [];
  }
};

export default shoes;
