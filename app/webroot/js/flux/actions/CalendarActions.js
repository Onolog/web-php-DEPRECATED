var $ = require('jquery');

var ActionTypes = require('flux/ActionTypes');
var ActionUtils = require('./ActionUtils');

/**
 * CalendarActions.js
 */
module.exports = {
  fetch: function(year, month) {
    $.get('/ajax/workouts/calendar/', {month, year})
      .done(this.onFetchSuccess)
      .fail(this.onFetchError);
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
  },
};
