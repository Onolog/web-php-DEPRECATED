import $ from 'jquery';
import {APP_ID, VERSION} from 'constants/Facebook';

/**
 * JS for initializing Facebook API
 */
function fbLoader(/*function*/ callback) {
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
        version: VERSION,
      });

      window.FB = FB;
      callback();
    },
    url: '//connect.facebook.net/en_US/all.js',
  });
}

module.exports = fbLoader;
