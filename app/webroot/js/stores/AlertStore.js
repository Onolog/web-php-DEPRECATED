/**
 * AlertStore
 *
 * Stores and handles alerts (confirmation and error messages).
 */

define([

  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',
  'constants/ActionTypes',
  'constants/Components'

], function(AppDispatcher, MicroEvent, ActionTypes, Components) {

  var ALERT = Components.ALERT;
  var _alertMessage;
  var _alertType;

  var AlertStore = {
    getAlertMessage: function() {
      return _alertMessage;
    },

    getAlertType: function() /*string*/ {
      return _alertType;
    },

    getAlertTypeIsDanger: function() {
      return _alertType === ALERT.DANGER;
    }
  };

  MicroEvent.mixin(AlertStore);

  AppDispatcher.register(function(payload) {
    _alertMessage = payload.data;

    switch(payload.eventName) {
      case ActionTypes.WORKOUT_ADD:
      case ActionTypes.WORKOUT_DELETE:
      case ActionTypes.WORKOUT_EDIT:
        _alertType = ALERT.SUCCESS;
        AlertStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.WORKOUT_ADD_ERROR:
      case ActionTypes.WORKOUT_DELETE_ERROR:
      case ActionTypes.WORKOUT_EDIT_ERROR:
      case ActionTypes.WORKOUT_VIEW_ERROR:
        _alertType = ALERT.DANGER;
        AlertStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return AlertStore;

});
