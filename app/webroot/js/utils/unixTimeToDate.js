var MS_PER_SEC = 1000;

/**
 * unixTimeToDate.js
 *
 * Converts a Unix timestamp to a JS Date object.
 */
module.exports = function(/*number*/ timestamp) {
  return new Date(timestamp * MS_PER_SEC);
};
