/**
 * CalendarActions.js
 */

define([

  'constants/ActionTypes',
  'utils/ActionUtils',
  'lib/jquery/jquery.min'

], function(

  ActionTypes,
  ActionUtils

) {

  var CALENDAR_WORKOUTS_FETCH = '/ajax/workouts/calendar/';

  return {
    fetch: function(year, month) {
      $.ajax({
        url: CALENDAR_WORKOUTS_FETCH,
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

});
