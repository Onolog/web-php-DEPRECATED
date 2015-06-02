/**
 * cloneDate.js
 *
 * Simple util function for cloning a date object.
 */
define(function() {

  return function(/*Date*/ date) {
    return new Date(date.valueOf());
  };

});
