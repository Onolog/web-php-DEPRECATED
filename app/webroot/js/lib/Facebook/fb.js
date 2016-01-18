var $ = require('jquery');
var FACEBOOK = require('constants/Facebook');

/**
 * JS for initializing Facebook API
 */
var FBLoader = function(/*function*/ callback) {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/all.js', function() {
    FB.init({
      appId: FACEBOOK.APP_ID,
      oauth: true,
      status: true, // check login status
      cookie: true, // enable cookies to allow the server to access the session
      version: 'v2.3'
    });

    window.FB = FB;

    callback();
  });
};

module.exports = FBLoader;
