import $ from 'jquery';
import {find} from 'lodash';

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
  ACTIVITY_FETCH,
  ACTIVITY_FETCH_ERROR,
  ACTIVITY_FETCH_SUCCESS,
  ACTIVITY_UPDATE,
  ACTIVITY_UPDATE_ERROR,
  ACTIVITY_UPDATE_SUCCESS,
  GARMIN_ACTIVITY_FETCH,
  GARMIN_ACTIVITY_FETCH_ERROR,
  GARMIN_ACTIVITY_FETCH_SUCCESS,
} from 'constants/ActionTypes';

function addActivitySuccess(response, dispatch) {
  const {activity, shoe} = response;
  dispatch({
    activity,
    shoe,
    type: ACTIVITY_ADD_SUCCESS,
  });
}

function addActivityError(response, dispatch) {
  const message =
    'Your activity could not be added. Please refresh the page and try again.';

  dispatch({
    error: {message},
    type: ACTIVITY_ADD_ERROR,
  });
}

export function addActivity(activity) {
  return dispatch => {
    dispatch({type: ACTIVITY_ADD});

    $.post('/activities/add.json', activity)
      .done(response => addActivitySuccess(response, dispatch))
      .fail(response => addActivityError(response, dispatch));
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
  return dispatch => {
    dispatch({type: ACTIVITY_DELETE});

    $.post(`/activities/delete/${activityId}.json`)
      .done(response => deleteActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_DELETE_ERROR}));
  };
}

function fetchActivitiesSuccess(response, dispatch) {
  const {activities, shoes, users} = response;
  dispatch({
    activities,
    shoes,
    type: ACTIVITIES_FETCH_SUCCESS,
    users,
  });
}

function fetchActivitiesRequest(year, month) {
  return dispatch => {
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

function fetchActivitySuccess(response, dispatch) {
  const {activities, shoes, users} = response;
  dispatch({
    activities,
    shoes,
    type: ACTIVITY_FETCH_SUCCESS,
    users,
  });
}

function fetchActivityRequest(id) {
  return dispatch => {
    dispatch({type: ACTIVITY_FETCH});

    $.get(`/activities/${id}.json`)
      .done(response => fetchActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_FETCH_ERROR}));
  };
}

export function fetchActivity(id) {
  return (dispatch, getState) => {
    const {activities} = getState();

    // Only fetch if we don't already have the activity.
    if (!find(activities, {id})) {
      dispatch(fetchActivityRequest(id))
    }
  };
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
  return dispatch => {
    dispatch({type: ACTIVITY_UPDATE});

    $.post(`/activities/edit/${activity.id}.json`, activity)
      .done(response => updateActivitySuccess(response, dispatch))
      .fail(response => dispatch({type: ACTIVITY_UPDATE_ERROR}));
  };
}

function getGarminActivityError(response, dispatch) {
  dispatch({
    error: {
      message: 'There was an error',
    },
    type: GARMIN_ACTIVITY_FETCH_ERROR,
  });
}

function getGarminActivitySuccess(garminData, dispatch) {
  dispatch({
    garminData,
    type: GARMIN_ACTIVITY_FETCH_SUCCESS,
  });
}

export function getGarminActivity(activityId) {
  return dispatch => {
    dispatch({type: GARMIN_ACTIVITY_FETCH});

    $.post(`/activities/scrape/${activityId}.json`)
      .done(response => getGarminActivitySuccess(response, dispatch))
      .fail(response => getGarminActivityError(response, dispatch));
  };
}
