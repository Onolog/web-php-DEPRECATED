/**
 * ShoeActions.js
 */

define([

  'dispatcher/AppDispatcher',
  'constants/ActionTypes',
  'constants/Shoes',
  'utils/ResponseHandler',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  ActionTypes,
  SHOES,
  ResponseHandler

) {

  function _onError(response, eventName) {
    var handler = new ResponseHandler(response);
    AppDispatcher.dispatch({
      eventName: eventName,
      alertMessage: handler.getMessage()
    });
  }

  return {
    fetch: function() {
      // Fetch the collection of items from the DB
      $.ajax({
        url: SHOES.ENDPOINT.ALL_SHOES_FETCH,
        type: 'GET',
        success: this.onFetchSuccess.bind(this),
        error: this.onFetchError.bind(this)
      });
    },

    onFetchSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.ALL_SHOES_FETCH,
          data: handler.getPayload()
        });
      } else {
        this.onFetchError(response);
      }
    },

    onFetchError: function(/*string|object*/ response) {
      _onError(response, ActionTypes.ALL_SHOES_FETCH_ERROR);
    },

    /**
     * View an individual shoe
     */
    view: function(id) {
      // Fetch the item from the DB
      $.ajax({
        url: SHOES.ENDPOINT.SHOE_VIEW + id,
        type: 'GET',
        success: this.onViewSuccess,
        error: this.onViewError
      });
    },

    onViewSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.SHOE_VIEW,
          data: handler.getPayload()
        });
      } else {
        this.onViewError(response);
      }
    },

    onViewError: function(/*string|object*/ response) {
      _onError(response, ActionTypes.SHOE_VIEW_ERROR);
    }

  };

});
