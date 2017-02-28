import $ from 'jquery';
import {filter, find} from 'lodash';
import ActionTypes from 'constants/ActionTypes';

function addShoeError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: ActionTypes.SHOE_ADD_ERROR,
  });
}

function addShoeSuccess({shoe}, dispatch) {
  dispatch({
    shoe,
    type: ActionTypes.SHOE_ADD_SUCCESS,
  });
}

export const addShoe = shoe => {
  return dispatch => {
    dispatch({
      shoe,
      type: ActionTypes.SHOE_ADD,
    });

    $.post('/shoes/add.json', shoe)
      .done(response => addShoeSuccess(response, dispatch))
      .fail(response => addShoeError(response, dispatch));
  };
};

function deleteShoeRequest(id) {
  return {
    id,
    type: ActionTypes.SHOE_DELETE,
  };
}

function deleteShoeError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: ActionTypes.SHOE_DELETE_ERROR,
  });
}

function deleteShoeSuccess({id}, dispatch) {
  dispatch({
    id,
    type: ActionTypes.SHOE_DELETE_SUCCESS,
  });
}

export const deleteShoe = id => {
  return dispatch => {
    dispatch(deleteShoeRequest(id));

    $.post(`/shoes/delete/${id}.json`)
      .done(response => deleteShoeSuccess(response, dispatch))
      .fail(response => deleteShoeError(response, dispatch));
  };
};

function fetchShoesSuccess({shoes}, dispatch) {
  dispatch({
    shoes,
    type: ActionTypes.ALL_SHOES_FETCH_SUCCESS,
  });
}

export function fetchShoes() {
  return dispatch => {
    dispatch({type: ActionTypes.ALL_SHOES_FETCH});

    $.get('/shoes/index.json')
      .done(response => fetchShoesSuccess(response, dispatch))
      .fail(response => dispatch({type: ALL_SHOES_FETCH_ERROR}));
  };
}

// function fetchShoeSuccess({shoes}, dispatch) {
//   dispatch({
//     shoes,
//     type: ActionTypes.SHOE_FETCH_SUCCESS,
//   });
// }

// export function fetchShoe() {
//   return dispatch => {
//     dispatch({type: ActionTypes.SHOE_FETCH});

//     $.get('/shoes/index.json')
//       .done(response => fetchShoeSuccess(response, dispatch))
//       .fail(response => dispatch({type: ActionTypes.SHOE_FETCH_ERROR}));
//   };
// }

function updateShoeError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: ActionTypes.SHOE_UPDATE_ERROR,
  });
}

function updateShoeSuccess({shoe}, dispatch) {
  dispatch({
    shoe,
    type: ActionTypes.SHOE_UPDATE_SUCCESS,
  });
}

export const updateShoe = shoe => {
  return dispatch => {
    dispatch({
      shoe,
      type: ActionTypes.SHOE_UPDATE,
    });

    $.post(`/shoes/edit/${shoe.id}.json`, shoe)
      .done(response => updateShoeSuccess(response, dispatch))
      .fail(response => updateShoeError(response, dispatch));
  };
};

function viewShoeError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: ActionTypes.SHOE_VIEW_ERROR,
  });
}

function viewShoeSuccess({activities, shoe}, dispatch) {
  dispatch({
    activities,
    shoe,
    type: ActionTypes.SHOE_VIEW_SUCCESS,
  });
}

export const viewShoe = shoeId => {
  return (dispatch, getState) => {
    const {shoes} = getState();
    const shoe = find(shoes, {id: shoeId});

    if (!shoe) {
      dispatch({type: ActionTypes.SHOE_VIEW});

      $.get(`/shoes/${shoeId}.json`)
        .done(response => viewShoeSuccess(response, dispatch))
        .fail(response => viewShoeError(response, dispatch));
    }
  };
};

function fetchShoeActivitiesError({responseJSON}, dispatch) {
  dispatch({
    error: responseJSON,
    type: ActionTypes.SHOE_ACTIVITIES_FETCH_ERROR,
  });
}

function fetchShoeActivitiesSuccess({activities, shoe}, dispatch) {
  dispatch({
    activities,
    type: ActionTypes.SHOE_ACTIVITIES_FETCH_SUCCESS,
  });
}

export const fetchShoeActivities = shoe => {
  return (dispatch, getState) => {
    const {activities} = getState();
    const shoeActivities = filter(activities, {shoe_id: shoe.id});

    if (shoeActivities.length !== shoe.activity_count) {
      dispatch({type: ActionTypes.SHOE_ACTIVITIES_FETCH});

      $.get(`/shoes/${shoe.id}.json`)
        .done(response => fetchShoeActivitiesSuccess(response, dispatch))
        .fail(response => fetchShoeActivitiesError(response, dispatch));
    }
  };
};
