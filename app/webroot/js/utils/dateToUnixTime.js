import invariant from './invariant';

const MS_PER_SEC = 1000;

/**
 * dateToUnixTime
 *
 * Converts a JS Date object to a Unix timestamp.
 */
function dateToUnixTime(/*Date*/ date) {
  invariant(
    date instanceof Date,
    'dateToUnixTime - `date` must be an instance of a Date object.'
  );

  // Unix timestamps are in seconds, JS timestamps are in milliseconds.
  // Set milliseconds to 0 and divide by 1000 to get seconds.
  date.setMilliseconds(0);
  return date.getTime() / MS_PER_SEC;
}

module.exports = dateToUnixTime;
