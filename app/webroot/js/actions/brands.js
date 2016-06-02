import $ from 'jquery';
import {
  BRANDS_FETCH,
  BRANDS_FETCH_ERROR,
  BRANDS_FETCH_SUCCESS,
} from 'constants/ActionTypes';

function fetchBrands() {
  return (dispatch) => {
    dispatch({type: BRANDS_FETCH});

    $.get('/ajax/brands/all/')
      .done(response => {
        let {message, payload} = JSON.parse(response);
        dispatch({
          brands: payload,
          type: BRANDS_FETCH_SUCCESS,
        });
      })
      .fail(response => dispatch({type: BRANDS_FETCH_ERROR}));
  };
}

export function fetchBrandsIfNeeded() {
  return (dispatch, getState) => {
    const {brands} = getState();
    if (!brands.length) {
      return dispatch(fetchBrands());
    }
  }
}
