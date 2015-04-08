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

    initCalendar: function(year, month) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.CALENDAR_INIT
      });

      // Fetch all the workouts from the DB
      $.ajax({
        url: CALENDAR_WORKOUTS_FETCH,
        data: {
          year: year,
          month: month
        },
        type: 'GET',
        success: this.onInitCalendarSuccess.bind(this),
        error: this.onInitCalendarError.bind(this)
      });
    },

    onInitCalendarSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.CALENDAR_INIT_SUCCESS,
          workouts: handler.getPayload()
        });
      } else {
        this.onInitCalendarError(response);
      }
    },

    onInitCalendarError: function(/*string|object*/ response) {
      var handler = new ResponseHandler(response);
      AppDispatcher.dispatch({
        eventName: ActionTypes.CALENDAR_INIT_ERROR,
        alertMessage: response.getMessage()
      });
    }

  };

});
