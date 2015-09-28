var moment = require('moment');
var pad = require('./pad');

/**
 * DateTimeUtils.js
 *
 * Date and time utils, mostly for formatting
 */

// Ex: October 21st, 1978
// For more formats, see: http://momentjs.com/docs/#/displaying/format/
var DEFAULT_DATE_FORMAT = 'MMMM Do, YYYY';

var DateTimeUtils = {
  /**
   * Wrapper around Moment for formatting dates. Defaults to:
   *
   *   'October 21st, 2014'
   */
  formatDate: function(
    /*Date|number|array*/ date,
    /*?string*/ format
  ) /*string*/ {
    if (date instanceof Date) {
      date = date.getTime();
    }
    format = format || DEFAULT_DATE_FORMAT;
    return moment(date).format(format);
  },
  /**
   * Formats given number of seconds into the following:
   *
   *    'hh:mm:ss'
   *    'm:ss'
   */
  secondsToTime: function(/*number|string*/ seconds) /*string*/ {
    var time = moment.duration(parseInt(seconds, 10), 's');
    var timeArr = [];
    var dd = time.days();
    var hh = time.hours();
    var mm = time.minutes();

    // If the time is more than a day, calculate the total number of hours
    if (dd) {
      hh += dd*24;
    }

    if (hh) {
      timeArr.push(hh);
      mm = pad(mm, 2);
    }
    timeArr.push(mm);
    timeArr.push(pad(time.seconds(), 2));

    return timeArr.join(':');
  }
};

module.exports = DateTimeUtils;
