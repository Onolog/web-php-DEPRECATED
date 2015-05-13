/**
 * LogoutDetect.js
 *
 * Detects if the user has been logged out and prompts them to log back in.
 */
define(['lib/Facebook/fb'], function() {

  var INTERVAL = 5 * 60 * 1000; // 5 mins

  setInterval(function() {
    FB.getLoginStatus(function(response) {
      if (
        response.status !== 'connected' &&
        confirm('You have been logged out. Please log back in.')
      ) {
        document.location = '/login';
      }
    }
  }, INTERVAL);

});
