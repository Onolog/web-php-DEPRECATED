import $ from 'jquery';

import {
  SESSION_LOGIN,
  SESSION_LOGIN_ERROR,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGOUT,
  SESSION_LOGOUT_ERROR,
  SESSION_LOGOUT_SUCCESS,
} from 'constants/ActionTypes';

const PERMISSIONS = {
  scope: [
    'email',
    'public_profile',
    'user_friends',
    'user_location',
  ].join(','),
};

function isConnected(status) {
  return status === 'connected';
}

/* Logout */
function logoutError(response, dispatch) {
  const message =
    'Sorry, something went wrong. Please refresh the page and try again';

  dispatch({
    error: {message},
    type: SESSION_LOGOUT_ERROR,
  });
}

function logoutSuccess({session}, dispatch) {
  dispatch({
    session,
    type: SESSION_LOGOUT_SUCCESS,
  });
}

function logout() {
  return (dispatch) => {
    dispatch({type: SESSION_LOGOUT});

    $.post('/users/logout.json')
      .done((response) => logoutSuccess(response, dispatch))
      .fail((response) => logoutError(response, dispatch));
  };
}

export function logoutIfNeeded() {
  return (dispatch, getState) => {
    const {session} = getState();
    if (session.id) {
      return dispatch(logout());
    }
  };
}

/* Login */
function login() {
  return (dispatch) => {
    dispatch({type: SESSION_LOGIN});

    FB.getLoginStatus(({authResponse, status}) => {
      if (isConnected(status)) {
        loginRequest(authResponse.accessToken, dispatch);
        return;
      }

      // The user isn't connected to FB. Log them in.
      FB.login(({authResponse, status}) => {
        if (isConnected(status)) {
          loginRequest(authResponse.accessToken, dispatch);
        }
      }, PERMISSIONS);
    });
  };
}

function loginRequest(accessToken, dispatch) {
  FB.api('/me', (response) => {
    response.accessToken = accessToken;
    $.post('/users/login.json', response)
      .done((response) => onLoginSuccess(response, dispatch))
      .fail((response) => onLoginError(response, dispatch));
  });
}

function onLoginSuccess(response, dispatch) {
  const {session} = response;
  dispatch({
    session,
    type: SESSION_LOGIN_SUCCESS,
  });
}

function onLoginError(response, dispatch) {
  const message =
    'There was a problem logging in. Please refresh the page and try again.';

  dispatch({
    error: {message},
    type: SESSION_LOGIN_ERROR,
  });
}

export function loginIfNeeded() {
  return (dispatch, getState) => dispatch(login());
}
