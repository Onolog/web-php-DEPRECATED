/**
 * ShoeActions.js
 */

define([

  'dispatcher/AppDispatcher',
  'constants/ActionTypes',
  'constants/Shoes',
  'utils/ActionUtils',
  'utils/cakePHP',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  ActionTypes,
  SHOES,
  ActionUtils,
  cakePHP

) {

  return {
    add: function(data) {
      $.ajax({
        url: SHOES.ENDPOINT.ADD,
        type: 'POST',
        data: cakePHP.encodeFormData(data, SHOES.FORM_NAME),
        success: this.onAddSuccess,
        error: this.onAddError
      });
    },

    onAddSuccess: function(response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.SHOE_ADD,
        ActionTypes.SHOE_ADD_ERROR
      );
    },

    onAddError: function(response) {
      ActionUtils.onError(response, ActionTypes.SHOE_ADD_ERROR);
    },

    cancel: function() {
      AppDispatcher.dispatch({
        eventName: ActionTypes.SHOE_CANCEL
      });
    },

    delete: function(id) {
      $.ajax({
        url: SHOES.ENDPOINT.DELETE + id,
        type: 'POST',
        success: this.onDeleteSuccess,
        error: this.onDeleteError
      });
    },

    onDeleteSuccess: function(response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.SHOE_DELETE,
        ActionTypes.SHOE_DELETE_ERROR
      );
    },

    onDeleteError: function(response) {
      ActionUtils.onError(response, ActionTypes.SHOE_DELETE_ERROR);
    },

    fetch: function() {
      // Fetch the collection of items from the DB
      $.ajax({
        url: SHOES.ENDPOINT.FETCH,
        type: 'GET',
        success: this.onFetchSuccess,
        error: this.onFetchError
      });
    },

    onFetchSuccess: function(/*string*/ response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.ALL_SHOES_FETCH,
        ActionTypes.ALL_SHOES_FETCH_ERROR
      );
    },

    onFetchError: function(/*string|object*/ response) {
      ActionUtils.onError(response, ActionTypes.ALL_SHOES_FETCH_ERROR);
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
        url: SHOES.ENDPOINT.VIEW + id,
        type: 'GET',
        success: this.onViewSuccess,
        error: this.onViewError
      });
    },

    onViewSuccess: function(/*string*/ response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.SHOE_VIEW,
        ActionTypes.SHOE_VIEW_ERROR
      );
    },

    onViewError: function(/*string|object*/ response) {
      ActionUtils.onError(response, ActionTypes.SHOE_VIEW_ERROR);
    }

  };

});
