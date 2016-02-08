var $ = require('jquery');
var {APP_ID} = require('constants/Facebook');

/**
 * JS for initializing Facebook API
 */
module.exports = function(/*function*/ callback) {
  if (window.FB) {
    callback();
    return;
  }

  $.ajax({
    cache: true,
    dataType: 'script',
    success: () => {
      FB.init({
        appId: APP_ID,
        oauth: true,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        version: 'v2.3',
      });

      window.FB = FB;
      callback();
    },
    url: '//connect.facebook.net/en_US/all.js',
  });
};
