var $ = require('jquery');

var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var ResponseHandler = require('utils/ResponseHandler');

var PERMISSIONS = {
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

/**
 * UserActions.js
 */
var UserActions = {

  login: function() {
    FB.getLoginStatus((response) => {
      if (isConnected(response.status)) {
        // The user is connected to Facebook but not Onolog. Create a new
        // session to log them in.
        UserActions.getFBUser(response.authResponse.accessToken);
        return;
      }

      // The user isn't connected to FB. Log them in.
      FB.login((response) => {
        if (isConnected(response.status)) {
          UserActions.getFBUser(response.authResponse.accessToken);
        }
        // If we're here it means the user canceled the FB login flow.
      }, PERMISSIONS);
    });
  },

  getFBUser: function(accessToken) {
    FB.api('/me', (response) => {
      response.accessToken = accessToken;
      $.post('/ajax/users/login', response).done(UserActions.onLoginSuccess);
    });
  },

  onLoginSuccess: function(response) {
    response = new ResponseHandler(response);
    if (response.getWasSuccessful()) {
      // TODO: Why don't dispatcher actions work here?
      document.location.reload();
    } else {
      alert('There was a problem logging in. Please try again later.');
    }
  },

  /**
   * Get the user's session from the server.
   */
  getSession: function() {
    $.get('/ajax/users/session').done(UserActions.onSessionSuccess);
  },

  onSessionSuccess: function(response) {
    response = new ResponseHandler(response);
    if (response.getWasSuccessful()) {
      AppDispatcher.dispatch({
        data: response.getPayload(),
        eventName: ActionTypes.USER_SESSION,
      });
    } else {
      alert('Something went wrong. Please try again');  
    }
  },

  logout: function() {
    $.post('/ajax/users/logout').done(UserActions.onLogoutSuccess);
  },

  onLogoutSuccess: function(response) {
    document.location = '/login';
    AppDispatcher.dispatch({
      eventName: ActionTypes.USER_LOGOUT,
    });
  },
};

module.exports = UserActions;
