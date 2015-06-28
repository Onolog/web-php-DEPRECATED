/**
 * getLocalTimeString.js
 *
 * Returns an ISO string with the local time + offset, instead of UTC.
 */
define(['lib/Moment/Moment'], function(moment) {
  return function(/*Date*/ date) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
  };
});
