import $ from 'jquery';
import {find} from 'lodash';

import {
  PROFILE_FETCH,
  PROFILE_FETCH_ERROR,
  PROFILE_FETCH_SUCCESS,
  SETTINGS_FETCH,
  SETTINGS_FETCH_ERROR,
  SETTINGS_FETCH_SUCCESS,
  USER_DATA_FETCH,
  USER_DATA_FETCH_ERROR,
  USER_DATA_FETCH_SUCCESS,
  USER_SETTINGS_SAVE,
  USER_SETTINGS_SAVE_ERROR,
  USER_SETTINGS_SAVE_SUCCESS,
} from 'constants/ActionTypes';

function fetchUserDataSuccess(response, dispatch) {
  const {activities, shoes} = response;
  dispatch({
    activities,
    shoes,
    type: USER_DATA_FETCH_SUCCESS,
  });
}

function fetchUserDataRequest() {
  return dispatch => {
    dispatch({type: USER_DATA_FETCH});

    $.get('/users/data.json')
      .done(response => fetchUserDataSuccess(response, dispatch))
      .fail(response => dispatch({type: USER_DATA_FETCH_ERROR}));
  };
}

export function fetchUserData() {
  // TODO: Check if we already have the data so we don't re-fetch.
  return (dispatch, getState) => dispatch(fetchUserDataRequest());
}

function fetchProfileError(response, dispatch) {
  const message =
    'Something went wrong. Please refresh the page and try again.';

  dispatch({
    error: {message},
    type: PROFILE_FETCH_ERROR,
  });
}

function fetchProfileSuccess({activities, activitySummary, user}, dispatch) {
  dispatch({
    activities,
    activitySummary,
    type: PROFILE_FETCH_SUCCESS,
    users: [user],
  });
}

function fetchProfileRequest(userId) {
  return dispatch => {
    dispatch({type: PROFILE_FETCH});

    $.get(`/users/${userId}.json`)
      .done(response => fetchProfileSuccess(response, dispatch))
      .fail(response => fetchProfileError(response, dispatch));
  };
}

export function fetchProfile(userId) {
  // TODO: Check if we already have the data so we don't re-fetch.
  return (dispatch, getState) => dispatch(fetchProfileRequest(userId));
}

function fetchSettingsSuccess({user}, dispatch) {
  dispatch({
    users: [user],
    type: SETTINGS_FETCH_SUCCESS,
  });
}

function fetchSettingsRequest() {
  return dispatch => {
    dispatch({type: SETTINGS_FETCH});

    $.get('/users/settings.json')
      .done(response => fetchSettingsSuccess(response, dispatch))
      .fail(response => dispatch({type: SETTINGS_FETCH_ERROR}));
  };
}

export function fetchSettings() {
  return (dispatch, getState) => {
    // Check local data to see if we already have the user.
    const {session, users} = getState();
    if (!(session && find(users, {id: session.id}))) {
      dispatch(fetchSettingsRequest());
    }
  };
}

function userSaveSettingsSuccess(response, dispatch) {
  const {user} = response;
  dispatch({
    type: USER_SETTINGS_SAVE_SUCCESS,
    user,
  });
}

export function userSaveSettings(settings) {
  return dispatch => {
    dispatch({type: USER_SETTINGS_SAVE});

    $.post('/users/edit.json', settings)
      .done(response => userSaveSettingsSuccess(response, dispatch))
      .fail(response => dispatch({type: USER_SETTINGS_SAVE_ERROR}));
  };
}
