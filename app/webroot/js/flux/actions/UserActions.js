var $ = require('jquery');

var ActionTypes = require('../ActionTypes');
var AppDispatcher = require('../AppDispatcher');
var ResponseHandler = require('../../utils/ResponseHandler');

var homeUrl = require('../../utils/homeUrl');

var PERMISSIONS = {
  scope: [
    'email',
    'public_profile',
    'user_friends',
    'user_location'
  ].join(',')
};

function isConnected(status) {
  return status === 'connected';
}

/**
 * UserActions.js
 */
var UserActions = {

  login: function() {
    FB.getLoginStatus(function(response) {
      if (isConnected(response.status)) {
        // The user is connected to Facebook but not Onolog. Create a new
        // session to log them in.
        UserActions.getFBUser(response.authResponse.accessToken);
      } else {
        // The user isn't connected to FB. Log them in.
        FB.login(function(response) {
          if (isConnected(response.status)) {
            UserActions.getFBUser(response.authResponse.accessToken);
          } else {
            // If we're here it means the user canceled the FB login flow.
          }
        }, PERMISSIONS);
      }
    });
  },

  getFBUser: function(accessToken) {
    FB.api('/me', function(response) {
      // Send info to server
      response.accessToken = accessToken;
      $.ajax({
        url: '/ajax/users/login',
        type: 'POST',
        data: response,
        success: UserActions.onLoginSuccess
      });
    });
  },

  onLoginSuccess: function(response) {
    var response = new ResponseHandler(response);
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
    $.ajax({
      url: '/ajax/users/session',
      type: 'GET',
      success: UserActions.onSessionSuccess
    });
  },

  onSessionSuccess: function(response) {
    var response = new ResponseHandler(response);
    if (response.getWasSuccessful()) {
      AppDispatcher.dispatch({
        data: response.getPayload(),
        eventName: ActionTypes.USER_SESSION
      });
    } else {
      alert('Something went wrong. Please try again');  
    }
  },

  logout: function() {
    $.ajax({
      url: '/ajax/users/logout',
      type: 'POST',
      success: UserActions.onLogoutSuccess
    });
  },

  onLogoutSuccess: function(response) {
    document.location = '/login';
    AppDispatcher.dispatch({
      eventName: ActionTypes.USER_LOGOUT
    });
  }
};

module.exports = UserActions;
