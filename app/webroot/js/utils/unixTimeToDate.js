/**
 * unixTimeToDate.js
 *
 * Converts a Unix timestamp to a JS Date object.
 */
define(function() {

  var MS_PER_SEC = 1000;

  return function(/*number*/ timestamp) {
    return new Date(timestamp * MS_PER_SEC);
  };
});
