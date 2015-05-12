/**
 * LoginDetect.js
 *
 * Pings the Facebook API at regular intervals to determine whether or not the
 * user is still logged in.
 */
define(['lib/Facebook/fb'], function() {

  setInterval(function() {
    FB.getLoginStatus(function(response) {
      debugger;
      if (response.status !== 'connected') {
        // TODO: Handle this case?
        return;
      }
    });
  }, 10000);

  FB.Event.subscribe('auth.logout', function(response) {
    debugger;
  });

});
