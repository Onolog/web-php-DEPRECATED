// @flow

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

function fetchUserDataSuccess(response: Object, dispatch: Function): void {
  const {activities, shoes} = response;
  dispatch({
    activities,
    shoes,
    type: USER_DATA_FETCH_SUCCESS,
  });
}

function fetchUserDataRequest() {
  return (dispatch: Function) => {
    dispatch({type: USER_DATA_FETCH});

    $.get('/users/data.json')
      .done(response => fetchUserDataSuccess(response, dispatch))
      .fail(response => dispatch({type: USER_DATA_FETCH_ERROR}));
  };
}

export function fetchUserData(): Function {
  // TODO: Check if we already have the data so we don't re-fetch.
  return (dispatch: Function, getState: Function) => (
    dispatch(fetchUserDataRequest())
  );
}

function fetchProfileError(response: Object, dispatch: Function) {
  const message =
    'Something went wrong. Please refresh the page and try again.';

  dispatch({
    error: {message},
    type: PROFILE_FETCH_ERROR,
  });
}

function fetchProfileSuccess({activities, activitySummary, users}, dispatch) {
  dispatch({
    activities,
    activitySummary,
    type: PROFILE_FETCH_SUCCESS,
    users,
  });
}

function fetchProfileRequest(userId) {
  return (dispatch: Function) => {
    dispatch({type: PROFILE_FETCH});

    $.get(`/users/${userId}.json`)
      .done(response => fetchProfileSuccess(response, dispatch))
      .fail(response => fetchProfileError(response, dispatch));
  };
}

export function fetchProfile(userId: number) {
  // TODO: Check if we already have the data so we don't re-fetch.
  return (dispatch: Function, getState: Function) => (
    dispatch(fetchProfileRequest(userId))
  );
}

function fetchSettingsSuccess(response: Object, dispatch: Function) {
  dispatch({
    users: response.users,
    type: SETTINGS_FETCH_SUCCESS,
  });
}

function fetchSettingsRequest() {
  return (dispatch: Function) => {
    dispatch({type: SETTINGS_FETCH});

    $.get('/users/settings.json')
      .done(response => fetchSettingsSuccess(response, dispatch))
      .fail(response => dispatch({type: SETTINGS_FETCH_ERROR}));
  };
}

export function fetchSettings() {
  return (dispatch: Function, getState: Function) => {
    // Check local data to see if we already have the user.
    const {session, users} = getState();
    if (!(session && find(users, {id: session.id}))) {
      dispatch(fetchSettingsRequest());
    }
  };
}

function userSaveSettingsSuccess(response: Object, dispatch: Function) {
  dispatch({
    ...response,
    type: USER_SETTINGS_SAVE_SUCCESS,
  });
}

export function userSaveSettings(settings: Object): Function {
  return (dispatch: Function) => {
    dispatch({type: USER_SETTINGS_SAVE});

    $.post('/users/edit.json', settings)
      .done(response => userSaveSettingsSuccess(response, dispatch))
      .fail(response => dispatch({type: USER_SETTINGS_SAVE_ERROR}));
  };
}
