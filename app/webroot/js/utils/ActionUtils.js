/**
 * ActionUtils.js
 */
define([

  'dispatcher/AppDispatcher',
  'utils/ResponseHandler'

], function(

  AppDispatcher,
  ResponseHandler

) {

  return {
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
          eventName: onSuccessEvent,
          data: handler.getPayload()
        });
      } else {
        ActionUtils.onError(response, onErrorEvent);
      }
    }
  };

});
