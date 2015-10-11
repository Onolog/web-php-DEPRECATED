var AppDispatcher = require('../AppDispatcher');
var ResponseHandler = require('../../utils/ResponseHandler');

/**
 * ActionUtils.js
 */
var ActionUtils = {
  onError: function(response, onErrorEvent) {
    var handler = new ResponseHandler(response);
    AppDispatcher.dispatch({
      eventName: onErrorEvent,
      alertMessage: handler.getMessage()
    });
  },

  onSuccess: function(response, onSuccessEvent, onErrorEvent) {
    var handler = new ResponseHandler(response);
    if (handler.getWasSuccessful()) {
      AppDispatcher.dispatch({
        data: handler.getPayload(),
        eventName: onSuccessEvent,
        alertMessage: handler.getMessage()
      });
    } else {
      this.onError(response, onErrorEvent);
    }
  }
};

module.exports = ActionUtils;
