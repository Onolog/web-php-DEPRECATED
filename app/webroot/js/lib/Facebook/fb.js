/**
 * JS for initializing Facebook API
 */
define(['constants/Facebook', 'facebook'], function(FACEBOOK){

  FB.init({
    appId: FACEBOOK.APP_ID,
    oauth: true,
    status: true, // check login status
    cookie: true, // enable cookies to allow the server to access the session
    version: 'v2.3'
  });

  return FB;
});
