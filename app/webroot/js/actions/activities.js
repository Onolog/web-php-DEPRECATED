import $ from 'jquery';
import encodeData from 'utils/encodeData';

import {
  ACTIVITIES_FETCH,
  ACTIVITIES_FETCH_ERROR,
  ACTIVITIES_FETCH_SUCCESS,
  ACTIVITY_ADD,
  ACTIVITY_ADD_ERROR,
  ACTIVITY_ADD_SUCCESS,
  ACTIVITY_DELETE,
  ACTIVITY_DELETE_ERROR,
  ACTIVITY_DELETE_SUCCESS,
  ACTIVITY_UPDATE,
  ACTIVITY_UPDATE_ERROR,
  ACTIVITY_UPDATE_SUCCESS,
} from 'constants/ActionTypes';

const FORM_NAME = 'Workout';

function addActivitySuccess(response, dispatch) {
  const {activity, shoes} = JSON.parse(response).payload;
  dispatch({
    activity,
    shoes,
    type: ACTIVITY_ADD_SUCCESS,
  });
}

export function addActivity(activity) {
  return (dispatch) => {
    dispatch({type: ACTIVITY_ADD});

    $.post('/ajax/workouts/add/', encodeData(activity, FORM_NAME))
      .done(response => addActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_ADD_ERROR}));
  };
}

function deleteActivitySuccess(response, dispatch) {
  const {id, shoes} = JSON.parse(response).payload;
  dispatch({
    id,
    shoes,
    type: ACTIVITY_DELETE_SUCCESS,
  });
}

export function deleteActivity(activityId) {
  return (dispatch) => {
    dispatch({type: ACTIVITY_DELETE});

    $.post(`/ajax/workouts/delete/${activityId}`)
      .done(response => deleteActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_DELETE_ERROR}));
  };
}

function fetchActivitiesSuccess(response, dispatch) {
  const {activities, shoes} = JSON.parse(response).payload;
  dispatch({
    activities,
    shoes,
    type: ACTIVITIES_FETCH_SUCCESS,
  });
}

function fetchActivitiesRequest(year, month) {
  return (dispatch) => {
    dispatch({type: ACTIVITIES_FETCH});

    // TODO: Make this a more general fetch endoint?
    $.get('/ajax/workouts/calendar/', {month, year})
      .done(response => fetchActivitiesSuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITIES_FETCH_ERROR}));
  };
}

export function fetchActivities(year, month) {
  // TODO: Check if we already have the activities so we don't re-fetch.
  return (dispatch, getState) => dispatch(fetchActivitiesRequest(year, month));
}

function updateActivitySuccess(response, dispatch) {
  const {activity, shoes} = JSON.parse(response).payload;
  dispatch({
    activity,
    shoes,
    type: ACTIVITY_UPDATE_SUCCESS,
  });
}

export function updateActivity(activity) {
  return (dispatch) => {
    dispatch({type: ACTIVITY_UPDATE});

    const data = encodeData(activity, FORM_NAME);
    $.post(`/ajax/workouts/edit/${activity.id}`, data)
      .done(response => updateActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_UPDATE_ERROR}));
  };
}
