var $ = require('jquery');

var ActionTypes = require('../ActionTypes');
var ActionUtils = require('./ActionUtils');

/**
 * CalendarActions.js
 */
module.exports = {
  fetch: function(year, month) {
    $.ajax({
      url: '/ajax/workouts/calendar/',
      data: {
        year: year,
        month: month
      },
      type: 'GET',
      success: this.onFetchSuccess,
      error: this.onFetchError
    });
  },

  onFetchSuccess: function(/*string*/ response) {
    ActionUtils.onSuccess(
      response,
      ActionTypes.WORKOUTS_FETCH,
      ActionTypes.WORKOUTS_FETCH_ERROR
    );
  },

  onFetchError: function(/*string|object*/ response) {
    ActionUtils.onError(response, ActionTypes.WORKOUTS_FETCH_ERROR);
  }
};
