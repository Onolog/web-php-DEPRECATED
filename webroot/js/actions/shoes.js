import $ from 'jquery';
import {filter} from 'lodash';
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
  SHOE_VIEW,
  SHOE_VIEW_ERROR,
  SHOE_VIEW_SUCCESS,
} from 'constants/ActionTypes';

function addShoeError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: SHOE_ADD_ERROR,
  });
}

function addShoeSuccess({shoe}, dispatch) {
  dispatch({
    shoe,
    type: SHOE_ADD_SUCCESS,
  });
}

export const addShoe = (shoe) => {
  return dispatch => {
    dispatch({
      shoe,
      type: SHOE_ADD,
    });

    $.post('/shoes/add.json', shoe)
      .done(response => addShoeSuccess(response, dispatch))
      .fail(response => addShoeError(response, dispatch));
  };
};

function deleteShoeRequest(id) {
  return {
    id,
    type: SHOE_DELETE,
  };
}

function deleteShoeError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: SHOE_DELETE_ERROR,
  });
}

function deleteShoeSuccess({id}, dispatch) {
  dispatch({
    id,
    type: SHOE_DELETE_SUCCESS,
  });
}

export const deleteShoe = (id) => {
  return dispatch => {
    dispatch(deleteShoeRequest(id));

    $.post(`/shoes/delete/${id}.json`)
      .done(response => deleteShoeSuccess(response, dispatch))
      .fail(response => deleteShoeError(response, dispatch));
  };
};

function fetchShoesSuccess({shoes}, dispatch) {
  return {
    shoes,
    type: ALL_SHOES_FETCH_SUCCESS,
  }; 
}

export function fetchShoes() {
  return dispatch => {
    dispatch({type: ALL_SHOES_FETCH});

    $.get('/shoes/index.json')
      .done(response => fetchShoesSuccess(response, dispatch))
      .fail(response => dispatch({type: ALL_SHOES_FETCH_ERROR}));
  };
}

function updateShoeError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: SHOE_UPDATE_ERROR,
  });
}

function updateShoeSuccess({shoe}, dispatch) {
  dispatch({
    shoe,
    type: SHOE_UPDATE_SUCCESS,
  }); 
}

export const updateShoe = (shoe) => {
  return dispatch => {
    dispatch({
      shoe,
      type: SHOE_UPDATE,
    });

    $.post(`/shoes/edit/${shoe.id}.json`, shoe)
      .done(response => updateShoeSuccess(response, dispatch))
      .fail(response => updateShoeError(response, dispatch));
  };
};

function viewShoeError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: SHOE_VIEW_ERROR,
  });
}

function viewShoeSuccess({activities, shoe}, dispatch) {
  dispatch({
    activities,
    shoe,
    type: SHOE_VIEW_SUCCESS,
  });
}

export const viewShoe = (shoe) => {
  return (dispatch, getState) => {
    dispatch({type: SHOE_VIEW});

    const {activities} = getState();
    const shoeActivities = filter(activities, {shoe_id: shoe.id});
    if (shoeActivities.length !== shoe.activity_count) {
      $.get(`/shoes/view/${shoe.id}.json`)
        .done(response => viewShoeSuccess(response, dispatch))
        .fail(response => viewShoeError(response, dispatch));
    }
  };
};
