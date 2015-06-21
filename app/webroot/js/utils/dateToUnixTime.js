/**
 * dateToUnixTime
 *
 * Converts a JS Date object to a Unix timestamp.
 */
define(['utils/invariant'], function(invariant) {

  var MS_PER_SEC = 1000;

  return function(/*Date*/ date) {
    invariant(
      date instanceof Date,
      'dateToUnixTime - `date` must be an instance of a Date object.'
    );

    // Unix timestamps are in seconds, JS timestamps are in milliseconds.
    // Set milliseconds to 0 and divide by 1000 to get seconds.
    date.setMilliseconds(0);
    return date.getTime() / MS_PER_SEC;
  };
});
