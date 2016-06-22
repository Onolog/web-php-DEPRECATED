import $ from 'jquery';
import {
  BRANDS_FETCH,
  BRANDS_FETCH_ERROR,
  BRANDS_FETCH_SUCCESS,
} from 'constants/ActionTypes';

function fetchBrandsError(response, dispatch) {
  dispatch({
    type: BRANDS_FETCH_ERROR,
  });
}

function fetchBrandsSuccess({brands}, dispatch) {
  dispatch({
    brands,
    type: BRANDS_FETCH_SUCCESS,
  });
}

function fetchBrandsRequest() {
  return (dispatch) => {
    dispatch({type: BRANDS_FETCH});

    $.get('/brands.json')
      .done(response => fetchBrandsSuccess(response, dispatch))
      .fail(response => fetchBrandsError(response, dispatch));
  };
}

export function fetchBrands() {
  return (dispatch, getState) => {
    const {brands} = getState();
    if (!brands.length) {
      return dispatch(fetchBrandsRequest());
    }
  };
}
