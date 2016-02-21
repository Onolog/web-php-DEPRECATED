import $ from 'jquery';

import ActionTypes from 'flux/ActionTypes';
import ActionUtils from 'flux/actions/ActionUtils';

import {encodeFormData} from 'utils/cakePHP';

const FORM_NAME = 'Shoe';

/**
 * ShoeActions.js
 */
module.exports = {
  add: function(data) {
    $.post('/ajax/shoes/add/', encodeFormData(data, FORM_NAME))
      .done(this.onAddSuccess)
      .fail(this.onAddError);
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
    $.post(`/ajax/shoes/delete/${id}`)
      .done(this.onDeleteSuccess)
      .fail(this.onDeleteError);
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
    $.get('/ajax/shoes/all')
      .done(this.onFetchSuccess)
      .fail(this.onFetchError);
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
    $.post(`/ajax/shoes/edit/${data.id}`, encodeFormData(data, FORM_NAME))
      .done(this.onSaveSuccess)
      .fail(this.onSaveError);
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
    $.get(`/ajax/shoes/view/${id}`)
      .done(this.onViewSuccess)
      .fail(this.onViewError);
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
  },
};
