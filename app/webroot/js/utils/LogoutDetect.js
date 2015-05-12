/**
 * LogoutDetect.js
 *
 * Detects if the user has been logged out and prompts them to log back in.
 */
define(['lib/Facebook/fb'], function() {

  FB.Event.subscribe('auth.logout', function(response) {
    debugger;
    if (confirm('You have been logged out. Please log back in.')) {
      document.location = '/login';
    }
  });

});
