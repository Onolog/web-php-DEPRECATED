var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var MicroEvent = require('flux/microevent');

var _isShown = false;

/**
 * DialogStore
 *
 * Tracks whether or not modal a modal dialog is open, and whether it should
 * be closed based on various actions.
 */
var DialogStore = {
  getIsShown: function() {
    return _isShown;
  }
};

MicroEvent.mixin(DialogStore);

AppDispatcher.register(function(payload) {
  switch(payload.eventName) {
    case ActionTypes.SHOE_ADD:
    case ActionTypes.SHOE_DELETE:
    case ActionTypes.SHOE_UPDATE:
    case ActionTypes.WORKOUT_ADD:
    case ActionTypes.WORKOUT_DELETE:
    case ActionTypes.WORKOUT_UPDATE:
      _isShown = false;
      DialogStore.trigger(ActionTypes.CHANGE);
      break;
  }
  return true;
});

module.exports = DialogStore;