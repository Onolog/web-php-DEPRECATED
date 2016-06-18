import ActionTypes from 'constants/ActionTypes';

const brands = (brands=[], action) => {
  switch (action.type) {
    case ActionTypes.BRANDS_FETCH:
      return brands;
    case ActionTypes.BRANDS_FETCH_ERROR:
      return brands;
    case ActionTypes.BRANDS_FETCH_SUCCESS:
      return action.brands;
    default:
      return brands;
  }
};

export default brands;
