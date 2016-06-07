import $ from 'jquery';

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

function addActivitySuccess(response, dispatch) {
  const {activity, shoe} = response;
  dispatch({
    activity,
    shoe,
    type: ACTIVITY_ADD_SUCCESS,
  });
}

export function addActivity(activity) {
  return (dispatch) => {
    dispatch({type: ACTIVITY_ADD});

    $.post('/activities/add.json', activity)
      .done(response => addActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_ADD_ERROR}));
  };
}

function deleteActivitySuccess(response, dispatch) {
  const {id, shoe} = response;
  dispatch({
    id,
    shoe,
    type: ACTIVITY_DELETE_SUCCESS,
  });
}

export function deleteActivity(activityId) {
  return (dispatch) => {
    dispatch({type: ACTIVITY_DELETE});

    $.post(`/activities/delete/${activityId}.json`)
      .done(response => deleteActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_DELETE_ERROR}));
  };
}

function fetchActivitiesSuccess(response, dispatch) {
  const {activities, shoes} = response;
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
    $.get('/activities/index.json', {month, year})
      .done(response => fetchActivitiesSuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITIES_FETCH_ERROR}));
  };
}

export function fetchActivities(year, month) {
  // TODO: Check if we already have the activities so we don't re-fetch.
  return (dispatch, getState) => dispatch(fetchActivitiesRequest(year, month));
}

function updateActivitySuccess(response, dispatch) {
  const {activity, shoe} = response;
  dispatch({
    activity,
    shoe,
    type: ACTIVITY_UPDATE_SUCCESS,
  });
}

export function updateActivity(activity) {
  return (dispatch) => {
    dispatch({type: ACTIVITY_UPDATE});

    $.post(`/activities/edit/${activity.id}.json`, activity)
      .done(response => updateActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_UPDATE_ERROR}));
  };
}