/**
 * BrandActions.js
 */

define([

  'dispatcher/AppDispatcher',
  'constants/ActionTypes',
  'utils/ActionUtils',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  ActionTypes,
  ActionUtils

) {

  var ENDPOINT = '/ajax/brands/all/';

  return {

    fetch: function() {
      $.ajax({
        url: ENDPOINT,
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

});
