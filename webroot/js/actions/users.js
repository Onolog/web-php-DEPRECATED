import $ from 'jquery';
import {find} from 'lodash';

import {
  PROFILE_FETCH,
  PROFILE_FETCH_ERROR,
  PROFILE_FETCH_SUCCESS,
  SETTINGS_FETCH,
  SETTINGS_FETCH_ERROR,
  SETTINGS_FETCH_SUCCESS,
  USER_SETTINGS_SAVE,
  USER_SETTINGS_SAVE_ERROR,
  USER_SETTINGS_SAVE_SUCCESS,
} from 'constants/ActionTypes';

function fetchProfileSuccess(response, dispatch) {
  const {activities, shoes, user} = response;
  dispatch({
    activities,
    shoes,
    users: [user],
    type: PROFILE_FETCH_SUCCESS,
  });
}

function fetchProfileRequest(userId) {
  return (dispatch) => {
    dispatch({type: PROFILE_FETCH});

    $.get(`/users/${userId}.json`)
      .done(response => fetchProfileSuccess(response, dispatch))
      .fail(response => dispatch({type: PROFILE_FETCH_ERROR}));
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
  return (dispatch) => {
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
