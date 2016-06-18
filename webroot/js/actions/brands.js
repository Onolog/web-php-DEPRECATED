import $ from 'jquery';
import {
  BRANDS_FETCH,
  BRANDS_FETCH_ERROR,
  BRANDS_FETCH_SUCCESS,
} from 'constants/ActionTypes';

function fetchBrandsSuccess({brands}, dispatch) {
  dispatch({
    brands,
    type: BRANDS_FETCH_SUCCESS,
  });
}

function fetchBrands() {
  return (dispatch) => {
    dispatch({type: BRANDS_FETCH});

    $.get('/brands/all.json')
      .done(response => fetchBrandsSuccess(response, dispatch))
      .fail(response => dispatch({type: BRANDS_FETCH_ERROR}));
  };
}

export function fetchBrandsIfNeeded() {
  return (dispatch, getState) => {
    const {brands} = getState();
    if (!brands.length) {
      return dispatch(fetchBrands());
    }
  };
}
