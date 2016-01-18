var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var MicroEvent = require('flux/microEvent');

var {USE} = require('constants/Bootstrap');

var _alertMessage;
var _alertType;

/**
 * AlertStore
 *
 * Stores and handles alerts (confirmation and error messages).
 */
var AlertStore = {
  getAlertMessage: function() {
    return _alertMessage;
  },

  getAlertType: function() /*string*/ {
    return _alertType;
  },

  getAlertTypeIsDanger: function() {
    return _alertType === USE.DANGER;
  }
};

MicroEvent.mixin(AlertStore);

AppDispatcher.register(function(payload) {
  _alertMessage = payload.alertMessage;

  switch(payload.eventName) {
    case ActionTypes.WORKOUT_ADD:
    case ActionTypes.WORKOUT_DELETE:
    case ActionTypes.WORKOUT_UPDATE:
      _alertType = USE.SUCCESS;
      AlertStore.trigger(ActionTypes.CHANGE);
      break;

    case ActionTypes.WORKOUT_ADD_ERROR:
    case ActionTypes.WORKOUT_DELETE_ERROR:
    case ActionTypes.WORKOUT_UPDATE_ERROR:
    case ActionTypes.WORKOUT_VIEW_ERROR:
      _alertType = USE.DANGER;
      AlertStore.trigger(ActionTypes.CHANGE);
      break;
  }
  return true;
});

module.exports = AlertStore;
