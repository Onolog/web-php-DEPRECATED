var $ = require('jquery');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var ActionUtils = require('../utils/ActionUtils');

/**
 * BrandActions.js
 */
module.exports = {
  fetch: function() {
    $.ajax({
      url: '/ajax/brands/all/',
      type: 'GET',
      success: this.onFetchSuccess,
      error: this.onFetchError
    });
  },

  onFetchSuccess: function(/*string*/ response) {
    ActionUtils.onSuccess(
      response,
      ActionTypes.BRANDS_FETCH,
      ActionTypes.BRANDS_FETCH_ERROR
    );
  },

  onFetchError: function(/*string|object*/ response) {
    ActionUtils.onError(response, ActionTypes.BRANDS_FETCH_ERROR);
  }
};
