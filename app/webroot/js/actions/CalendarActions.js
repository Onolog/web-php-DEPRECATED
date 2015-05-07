/**
 * CalendarActions.js
 */

define([

  'dispatcher/AppDispatcher',
  'constants/ActionTypes',
  'utils/ResponseHandler',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  ActionTypes,
  ResponseHandler

) {

  var CALENDAR_WORKOUTS_FETCH = '/ajax/users/calendar/';

  return {

    fetchWorkouts: function(year, month) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUTS_FETCH
      });

      // Fetch all the workouts from the DB
      $.ajax({
        url: CALENDAR_WORKOUTS_FETCH,
        data: {
          year: year,
          month: month
        },
        type: 'GET',
        success: this.onFetchWorkoutsSuccess.bind(this),
        error: this.onFetchWorkoutsError.bind(this)
      });
    },

    onFetchWorkoutsSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.WORKOUTS_FETCH_SUCCESS,
          workouts: handler.getPayload()
        });
      } else {
        this.onFetchWorkoutsError(response);
      }
    },

    onFetchWorkoutsError: function(/*string|object*/ response) {
      var handler = new ResponseHandler(response);
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUTS_FETCH_ERROR,
        alertMessage: response.getMessage()
      });
    }

  };

});
