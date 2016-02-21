import $ from 'jquery';

import ActionTypes from 'flux/ActionTypes';
import ActionUtils from './ActionUtils';

/**
 * BrandActions.js
 */
const BrandActions = {
  fetch: function() {
    $.get('/ajax/brands/all/')
      .done(this.onFetchSuccess)
      .fail(this.onFetchError);
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
  },
};

module.exports = BrandActions;
