var moment = require('moment');
var pad = require('./pad');

/**
 * Formats given number of seconds into the following:
 *
 *    'hh:mm:ss'
 *    'm:ss'
 */
function secondsToTime(/*number|string*/ seconds) /*string*/ {
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

module.exports = secondsToTime;
