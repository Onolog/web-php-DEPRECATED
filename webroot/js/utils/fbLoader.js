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
        status: true,
        cookie: true,
        version: VERSION,
      });

      window.FB = FB;
      callback();
    },
    url: '//connect.facebook.net/en_US/all.js',
  });
}

module.exports = fbLoader;
