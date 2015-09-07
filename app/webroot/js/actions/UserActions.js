/**
 * UserActions.js
 */
define([

  'dispatcher/AppDispatcher',
  'constants/ActionTypes',
  'utils/homeUrl',
  'utils/ResponseHandler',

  'lib/jquery/jquery.min',
  'facebook'

], function(

  AppDispatcher,
  ActionTypes,
  homeUrl,
  ResponseHandler

) {

  var _accessToken;
  var _permissions = {
    scope: [
      'email',
      'public_profile',
      'user_friends',
      'user_location'
    ].join(',')
  };

  function onSuccess(response) {
    var response = new ResponseHandler(response);
    if (response.getWasSuccessful()) {
      // If successful, redirect to the calendar view for the current month.
      document.location = homeUrl();
      return;
    }

    alert('There was a problem logging in. Please try again later.');
  }

  var UserActions = {

    login: function() {
      FB.login(function(response) {
        if (response.status === 'connected') {
          var accessToken = response.authResponse.accessToken;
          FB.api('/me', function(response) {
            // Send info to server
            response.accessToken = accessToken;
            $.ajax({
              url: '/ajax/users/login',
              type: 'POST',
              data: response,
              success: onSuccess
            });
          });
        }
      }, _permissions);
    },

    getLoginStatus: function() {
      FB.getLoginStatus(function(response) {
        AppDispatcher.dispatch({
          data: response,
          eventName: ActionTypes.USER_STATUS
        });
      });
    },

    getUser: function() {
      FB.api('/me', function(response) {
        AppDispatcher.dispatch({
          data: response,
          eventName: ActionTypes.USER_FETCH
        });
      });
    },

    logout: function() {
      FB.logout(function(response) {
        AppDispatcher.dispatch({
          data: response,
          eventName: ActionTypes.USER_LOGOUT
        });
      });
    }
  };

  return UserActions;

});
