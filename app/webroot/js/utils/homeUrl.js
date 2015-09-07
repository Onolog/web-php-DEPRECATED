/**
 * homeUrl
 *
 * Simple util function for defining the default home url.
 */
define(['utils/pad'], function(pad) {
  return function() {
    var now = new Date();
    return '/' + now.getFullYear() + '/' + pad(now.getMonth() + 1, 2);
  }
});
