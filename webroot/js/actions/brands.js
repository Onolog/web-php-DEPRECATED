// @flow

import $ from 'jquery';
import {
  BRANDS_FETCH,
  BRANDS_FETCH_ERROR,
  BRANDS_FETCH_SUCCESS,
} from 'constants/ActionTypes';

function fetchBrandsError(response: Object, dispatch: Function): void {
  dispatch({
    type: BRANDS_FETCH_ERROR,
  });
}

function fetchBrandsSuccess(response: Object, dispatch: Function): void {
  dispatch({
    brands: response.brands,
    type: BRANDS_FETCH_SUCCESS,
  });
}

function fetchBrandsRequest(): Function {
  return (dispatch: Function) => {
    dispatch({type: BRANDS_FETCH});

    $.get('/brands.json')
      .done(response => fetchBrandsSuccess(response, dispatch))
      .fail(response => fetchBrandsError(response, dispatch));
  };
}

export function fetchBrands(): Function {
  return (dispatch: Function, getState: Function) => {
    const {brands} = getState();
    if (!brands.length) {
      return dispatch(fetchBrandsRequest());
    }
  };
}
