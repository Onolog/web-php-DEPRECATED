// @flow

import invariant from 'invariant';
import $ from 'jquery';
import {filter, find} from 'lodash';
import ActionTypes from 'constants/ActionTypes';
import type {Shoe} from 'types/Shoe';

function addShoeError(response: Object, dispatch: Function): void {
  dispatch({
    error: response.responseJSON,
    type: ActionTypes.SHOE_ADD_ERROR,
  });
}

function addShoeSuccess(response: Object, dispatch: Function) {
  dispatch({
    shoe: response.shoe,
    type: ActionTypes.SHOE_ADD_SUCCESS,
  });
}

export function addShoe(shoe: Shoe): Function {
  return (dispatch: Function) => {
    dispatch({
      shoe,
      type: ActionTypes.SHOE_ADD,
    });

    $.post('/shoes/add.json', shoe)
      .done(response => addShoeSuccess(response, dispatch))
      .fail(response => addShoeError(response, dispatch));
  };
};

function deleteShoeError(response: Object, dispatch: Function): void {
  dispatch({
    error: response.responseJSON,
    type: ActionTypes.SHOE_DELETE_ERROR,
  });
}

function deleteShoeSuccess(response: Object, dispatch: Function): void {
  dispatch({
    id: response.id,
    type: ActionTypes.SHOE_DELETE_SUCCESS,
  });
}

export function deleteShoe(id: number): Function {
  return (dispatch: Function) => {
    dispatch({
      id,
      type: ActionTypes.SHOE_DELETE,
    });

    $.post(`/shoes/delete/${id}.json`)
      .done(response => deleteShoeSuccess(response, dispatch))
      .fail(response => deleteShoeError(response, dispatch));
  };
};

function fetchShoesSuccess(response: Object, dispatch: Function): void {
  dispatch({
    shoes: response.shoes,
    type: ActionTypes.ALL_SHOES_FETCH_SUCCESS,
  });
}

export function fetchShoes(): Function {
  return dispatch => {
    dispatch({type: ActionTypes.ALL_SHOES_FETCH});

    $.get('/shoes/index.json')
      .done(response => fetchShoesSuccess(response, dispatch))
      .fail(response => dispatch({type: ActionTypes.ALL_SHOES_FETCH_ERROR}));
  };
}

function updateShoeError(response: Object, dispatch: Function) {
  dispatch({
    error: response.responseJSON,
    type: ActionTypes.SHOE_UPDATE_ERROR,
  });
}

function updateShoeSuccess(response: Object, dispatch: Function) {
  dispatch({
    shoe: response.shoe,
    type: ActionTypes.SHOE_UPDATE_SUCCESS,
  });
}

export function updateShoe(shoe: Shoe): Function {
  return (dispatch: Function) => {
    const {id} = shoe;
    invariant(
      !!id,
      'You are trying to update a shoe that does not exist.'
    );

    dispatch({
      shoe,
      type: ActionTypes.SHOE_UPDATE,
    });

    $.post(`/shoes/edit/${id}.json`, shoe)
      .done(response => updateShoeSuccess(response, dispatch))
      .fail(response => updateShoeError(response, dispatch));
  };
};

function viewShoeError(response: Object, dispatch: Function): void {
  dispatch({
    error: response.responseJSON,
    type: ActionTypes.SHOE_VIEW_ERROR,
  });
}

function viewShoeSuccess(response: Object, dispatch: Function): void {
  const {activities, shoe} = response;
  dispatch({
    activities,
    shoe,
    type: ActionTypes.SHOE_VIEW_SUCCESS,
  });
}

export function viewShoe(shoeId: number): Function {
  return (dispatch: Function, getState: Function): void => {
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

function fetchShoeActivitiesError(response: Object, dispatch: Function) {
  dispatch({
    error: response.responseJSON,
    type: ActionTypes.SHOE_ACTIVITIES_FETCH_ERROR,
  });
}

function fetchShoeActivitiesSuccess(
  response: Object,
  dispatch: Function
): void {
  const {activities, shoe} = response;
  dispatch({
    activities,
    type: ActionTypes.SHOE_ACTIVITIES_FETCH_SUCCESS,
  });
}

export function fetchShoeActivities(shoe: Shoe): Function {
  return (dispatch: Function, getState: Function): void => {
    const {id} = shoe;
    invariant(
      !!id,
      'You are trying to update a shoe that does not exist.'
    );

    const {activities} = getState();
    const shoeActivities = filter(activities, {shoe_id: id});

    if (shoeActivities.length !== shoe.activity_count) {
      dispatch({type: ActionTypes.SHOE_ACTIVITIES_FETCH});

      $.get(`/shoes/${id}.json`)
        .done(response => fetchShoeActivitiesSuccess(response, dispatch))
        .fail(response => fetchShoeActivitiesError(response, dispatch));
    }
  };
};
