var {chain, map, reduce} = require('lodash');
var moment = require('moment-timezone');

/**
 * Activity Utils
 *
 * A series of functions for grouping and manipulating activity data.
 */

/**
 * Provides standard top-level metrics for a grouping of activities.
 */
function getGroupingInfo(/*array*/ activities) {
  return {
    miles: getAggregateDistance(activities),
    run_count: activities.length,
    duration: getAggregateDuration(activities),
  };
}

/**
 * Calculates the total distance across an array of activities.
 */
function getAggregateDistance(/*array*/ activities) {
  return +chain(activities)
    .map('distance')
    .reduce((total, miles) => +total + +miles, 0)
    .value()
    .toFixed(2);
}

/**
 * Calculates the total duration across an array of activities.
 */
function getAggregateDuration(/*array*/ activities) {
  return _.chain(activities)
    .map('duration')
    .reduce((total, seconds) => +total + +seconds, 0)
    .value();
}

/**
 * Get the value of a particular date unit. For example:
 *
 *    - year
 *    - month
 *    - week
 *    - date
 *    - day
 *    - hour
 *    - minute
 *    - second
 *    - millisecond
 */
function _getDateValue(/*string*/ unit, /*object*/ activity) {
  return moment.tz(activity.start_date, activity.timezone).get(unit);
}

/**
 * Find the range of time for which there could be an activity and get the
 * full range of units in between.
 */
function _getRange(/*string*/ unit, /*object*/ activities) {
  var min;
  var max;

  // TODO: Find a better fallback for this scenario.
  if (!activities.length) {
    return _.range(1, 53);
  }

  switch (unit) {
    case 'year':
      // From the earliest year in the set of activities to the current year.
      min = _getDateValue(unit, _.last(activities));
      max = (new Date()).getFullYear();
      break;
    case 'month':
      // There are always 12 months in a year.
      min = 0;
      max = 11;
      break;
    case 'week':
      // We expect all activities here to be from a single year.
      // Find the number of weeks in that year.
      var {start_date, timezone} = _.first(activities);
      min = 1;
      // TODO: Use `moment.isoWeeksInYear()` instead?
      max = moment.tz(start_date, timezone).weeksInYear();
      break;
    case 'dayOfYear':
      var {start_date, timezone} = _.first(activities);
      min = 1;
      max = moment.tz(start_date, timezone).isLeapYear() ? 366 : 365;
      break;
  }

  return _.range(min, max + 1);
}

/**
 * Given a flat array of activities, groups them by the given unit of time.
 * For anything other than 'year', it's assumed that all the activities are in
 * the same year.
 */
function _groupBy(/*string*/ unit, /*array*/ activities) {
  // Group the activities by the desired unit of time.
  var range = _getRange(unit, activities);
  activities = _.groupBy(activities, _getDateValue.bind(null, unit));

  // Create the shell object keyed by unit of time.
  var grouped = {};
  _.forEach(range, value => grouped[value] = []);

  // Merge the shell object with the grouped activities.
  return _.extend(grouped, activities);
}

module.exports = {
  getAggregateDistance: getAggregateDistance,
  getAggregateDuration: getAggregateDuration,
  getGroupingInfo: getGroupingInfo,
  groupActivities: {
    byYear: _groupBy.bind(null, 'year'),
    byMonth: _groupBy.bind(null, 'month'),
    byWeek: _groupBy.bind(null, 'week'),
    byDay: _groupBy.bind(null, 'dayOfYear')
  }
};
