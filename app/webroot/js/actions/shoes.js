import $ from 'jquery';
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
  SHOE_UPDATE,
  SHOE_UPDATE_ERROR,
  SHOE_UPDATE_SUCCESS,
} from 'constants/ActionTypes';

import encodeData from 'utils/encodeData';

const FORM_NAME = 'Shoe';

function addShoeRequest(shoe) {
  return {
    shoe,
    type: SHOE_ADD,
  };
}

function addShoeResponse(shoe) {
  return {
    shoe,
    type: SHOE_ADD_SUCCESS,
  }; 
}

export const addShoe = (shoe) => {
  return dispatch => {
    dispatch(addShoeRequest(shoe));

    $.post('/ajax/shoes/add/', encodeData(shoe, FORM_NAME))
      .done(response => {
        const {payload} = JSON.parse(response);
        dispatch(addShoeResponse(payload));
      })
      .fail(response => dispatch({type: SHOE_ADD_ERROR}));
  };
};

function deleteShoeRequest(id) {
  return {
    id,
    type: SHOE_DELETE,
  };
}

function deleteShoeResponse(id) {
  return {
    id,
    type: SHOE_DELETE_SUCCESS,
  }; 
}

export const deleteShoe = (id) => {
  return dispatch => {
    dispatch(deleteShoeRequest(id));

    $.post(`/ajax/shoes/delete/${id}`)
      .done(response => {
        const {payload} = JSON.parse(response);
        dispatch(deleteShoeResponse(payload));
      })
      .fail(response => dispatch({type: SHOE_DELETE_ERROR}));
  };
};

function fetchShoesRequest() {
  return {
    type: ALL_SHOES_FETCH,
  };
}

function fetchShoesResponse(shoes) {
  return {
    shoes,
    type: ALL_SHOES_FETCH_SUCCESS,
  }; 
}

export const fetchShoes = () => {
  return dispatch => {
    dispatch(fetchShoesRequest());

    $.get('/ajax/shoes/all')
      .done(response => {
        const {payload} = JSON.parse(response);
        dispatch(fetchShoesResponse(payload));
      })
      .fail(response => dispatch({type: ALL_SHOES_FETCH_ERROR}));
  };
};

function updateShoeRequest(shoe) {
  return {
    shoe,
    type: SHOE_UPDATE,
  };
}

function updateShoeResponse(shoe) {
  return {
    shoe,
    type: SHOE_UPDATE_SUCCESS,
  }; 
}

export const updateShoe = (shoe) => {
  return dispatch => {
    dispatch(updateShoeRequest(shoe));

    $.post(`/ajax/shoes/edit/${shoe.id}`, encodeData(shoe, FORM_NAME))
      .done(response => {
        const {payload} = JSON.parse(response);
        dispatch(updateShoeResponse(payload));
      })
      .fail(response => dispatch({type: SHOE_UPDATE_ERROR}));
  };
};
