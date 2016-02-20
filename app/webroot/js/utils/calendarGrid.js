import {isInteger} from 'lodash';

/**
 * calendarGrid
 *
 * Given a month and year, returns an array describing how to lay out the
 * full month as a grid.
 */

function getDate(year, month, day) {
  var now = new Date();
  return new Date(
    year,
    month,
    day,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );
}

var DAYS_IN_WEEK = 7;

function calendarGrid(/*number*/ month, /*number*/ year) {
  if (!(isInteger(month) && isInteger(year))) {
    throw new Error('calendarGrid: The month and year must be integers');
  }

  // Number of days in the given month
  var daysInMonth = getDate(year, month + 1, 0).getDate();

  // Numeric representation of the day of the week
  var monthStartDay = getDate(year, month, 1).getDay();

  var day;
  var monthArr = [];
  var weekArr = [];
  var ii = 0;  // Day counter

  // Start the month on the right day of the week
  if (monthStartDay !== 0) {
    for (ii = 0; ii < monthStartDay; ii++) {
      // Calculate the days from the previous month to display
      day = ii + 1 - monthStartDay;
      weekArr.push({ date: getDate(year, month, day) });
    }
  }

  // Add all the days in the selected month
  for (day = 1; day <= daysInMonth; day++) {
    // Do we need to start a new week?
    if (ii === 0) {
      weekArr = [];
    }

    // Add the record
    weekArr.push({ date: getDate(year, month, day) });

    ii++;

    // Do we need to end the row?
    if (ii === DAYS_IN_WEEK) {
      // Add the week/row to the month
      monthArr.push(weekArr);
      weekArr = []; // Reset the weekly workout counter
      ii = 0; // Reset counter
    }
  }

  // Is the last week incomplete?
  if (ii > 0) {
    // Add the necessary number of days to complete the week
    // Continue incrementing day; ex: Oct 32nd == Nov. 1st
    for (ii; ii < DAYS_IN_WEEK; ii++, day++) {
      weekArr.push({
        date: getDate(year, month, day),
      });
    }
    monthArr.push(weekArr);
  }

  return monthArr;
}

module.exports = calendarGrid;
