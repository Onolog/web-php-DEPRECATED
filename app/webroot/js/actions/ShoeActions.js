/**
 * ShoeActions.js
 */

define([

  'dispatcher/AppDispatcher',
  'constants/ActionTypes',
  'constants/Shoes',
  'utils/cakePHP',
  'utils/ResponseHandler',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  ActionTypes,
  SHOES,
  cakePHP,
  ResponseHandler

) {

  function _onError(response, onErrorEvent) {
    var handler = new ResponseHandler(response);
    AppDispatcher.dispatch({
      eventName: onErrorEvent,
      alertMessage: handler.getMessage()
    });
  }

  function _onSuccess(response, onSuccessEvent, onErrorEvent) {
    var handler = new ResponseHandler(response);
    if (handler.getWasSuccessful()) {
      AppDispatcher.dispatch({
        eventName: onSuccessEvent,
        data: handler.getPayload()
      });
    } else {
      _onError(response, onErrorEvent);
    }
  }

  return {
    add: function(data) {
      debugger;
      $.ajax({
        url: SHOES.ENDPOINT.SHOE_ADD,
        type: 'POST',
        data: cakePHP.encodeFormData(data, SHOES.FORM_NAME),
        success: this.onAddSuccess,
        error: this.onAddError
      });
    },

    onAddSuccess: function(response) {
      _onSuccess(
        response,
        ActionTypes.SHOE_ADD,
        ActionTypes.SHOE_ADD_ERROR
      );
    },

    onAddError: function(response) {
      _onError(response, ActionTypes.ALL_SHOES_FETCH_ERROR);
    },

    cancel: function() {
      AppDispatcher.dispatch({
        eventName: ActionTypes.SHOE_CANCEL
      });
    },

    fetch: function() {
      // Fetch the collection of items from the DB
      $.ajax({
        url: SHOES.ENDPOINT.ALL_SHOES_FETCH,
        type: 'GET',
        success: this.onFetchSuccess,
        error: this.onFetchError
      });
    },

    onFetchSuccess: function(/*string*/ response) {
      _onSuccess(
        response,
        ActionTypes.ALL_SHOES_FETCH,
        ActionTypes.ALL_SHOES_FETCH_ERROR
      );
    },

    onFetchError: function(/*string|object*/ response) {
      _onError(response, ActionTypes.ALL_SHOES_FETCH_ERROR);
    },

    /**
     * Updates the temporary state of a workout, whie editing or adding.
     */
    update: function(/*string*/ field, /*?any*/ value) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.SHOE_UPDATE,
        field: field,
        value: value
      });
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
      _onSuccess(
        response,
        ActionTypes.SHOE_VIEW,
        ActionTypes.SHOE_VIEW_ERROR
      );
    },

    onViewError: function(/*string|object*/ response) {
      _onError(response, ActionTypes.SHOE_VIEW_ERROR);
    }

  };

});
