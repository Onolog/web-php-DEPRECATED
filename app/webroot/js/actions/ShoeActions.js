/**
 * ShoeActions.js
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

  var ALL_SHOES_FETCH = '/ajax/shoes/all';

  return {

    fetchShoes: function() {
      AppDispatcher.dispatch({
        eventName: ActionTypes.ALL_SHOES_FETCH
      });

      // Fetch all the workouts from the DB
      $.ajax({
        url: ALL_SHOES_FETCH,
        type: 'GET',
        success: this.onFetchShoesSuccess.bind(this),
        error: this.onFetchShoesError.bind(this)
      });
    },

    onFetchShoesSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.ALL_SHOES_FETCH_SUCCESS,
          shoes: handler.getPayload()
        });
      } else {
        this.onFetchShoesError(response);
      }
    },

    onFetchShoesError: function(/*string|object*/ response) {
      var handler = new ResponseHandler(response);
      AppDispatcher.dispatch({
        eventName: ActionTypes.ALL_SHOES_FETCH_ERROR,
        alertMessage: response.getMessage()
      });
    }

  };

});
