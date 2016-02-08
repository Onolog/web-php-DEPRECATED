var moment = require('moment');

var secondsToTime = require('./secondsToTime');

/**
 * calculatePace.js
 *
 * Calculates the pace per mile/km, formatted as 'm:ss'
 */
var calculatePace = {

  fromHHMMSS: function(
    /*number|string*/ distance,
    /*number|string*/ hours,
    /*number|string*/ minutes,
    /*number|string*/ seconds
  ) /*string*/ {

    // Convert the time to seconds
    seconds = moment.duration({hours, minutes, seconds}).asSeconds();

    return calculatePace.fromSeconds(distance, seconds);
  },

  fromSeconds: function(
    /*number|string*/ distance,
    /*number|string*/seconds
  ) /*string*/ {
    if (!distance || !seconds) {
      // If distance hasn't been entered or has a value of zero, the
      // calculation will come back invalid. No time will just be zero.
      // In either case, just return '0:00' as the pace.
      return secondsToTime(0);
    }

    return secondsToTime(
      moment.duration(seconds/distance, 's').asSeconds()
    );
  },
};

module.exports = calculatePace;
