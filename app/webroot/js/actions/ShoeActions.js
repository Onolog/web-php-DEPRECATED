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

  var ENDPOINT = SHOES.ENDPOINT;
  var FORM_NAME = SHOES.FORM_NAME;

  return {
    add: function(data) {
      $.ajax({
        url: ENDPOINT.ADD,
        type: 'POST',
        data: cakePHP.encodeFormData(data, FORM_NAME),
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

    delete: function(id) {
      $.ajax({
        url: ENDPOINT.DELETE + id,
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
        url: ENDPOINT.FETCH,
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

    save: function(/*object*/ data) {
      $.ajax({
        url: ENDPOINT.EDIT + data.id,
        type: 'POST',
        data: cakePHP.encodeFormData(data, FORM_NAME),
        success: this.onSaveSuccess,
        error: this.onSaveError
      });
    },

    onSaveSuccess: function(/*string*/ response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.SHOE_UPDATE,
        ActionTypes.SHOE_UPDATE_ERROR
      );
    },

    onSaveError: function(/*string|object*/ response) {
      ActionUtils.onError(response, ActionTypes.SHOE_UPDATE_ERROR);
    },

    /**
     * View an individual shoe
     */
    view: function(id) {
      $.ajax({
        url: ENDPOINT.VIEW + id,
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
