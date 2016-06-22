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
      .done(response => logoutSuccess(response, dispatch))
      .fail(response => dispatch({type: SESSION_LOGOUT_ERROR}));
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
        getFBUser(authResponse.accessToken, dispatch);
        return;
      }

      // The user isn't connected to FB. Log them in.
      FB.login(({authResponse, status}) => {
        if (isConnected(status)) {
          getFBUser(authResponse.accessToken, dispatch);
        }
      }, PERMISSIONS);
    });
  };
}

function getFBUser(accessToken, dispatch) {
  FB.api('/me', (response) => {
    response.accessToken = accessToken;
    $.post('/users/login.json', response)
      .done(response => onLoginSuccess(response, dispatch))
      .fail(response => onLoginError(response, dispatch));
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
  dispatch({type: SESSION_LOGIN_ERROR});

  // TODO: This doesn't belong in an action.
  alert('There was a problem logging in. Please try again later.');
}

export function loginIfNeeded() {
  return (dispatch, getState) => dispatch(login());
}
