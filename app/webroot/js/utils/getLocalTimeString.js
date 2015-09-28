var moment = require('moment');

/**
 * getLocalTimeString.js
 *
 * Returns an ISO string with the local time + offset, instead of UTC.
 */
module.exports = function(/*Date*/ date) {
  return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
};
