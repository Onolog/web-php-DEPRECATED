/**
 * cloneDate.js
 *
 * Simple util function for cloning a date object.
 */
module.exports = function(/*Date*/ date) {
  return new Date(date.valueOf());
};
