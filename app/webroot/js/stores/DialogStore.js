/**
 * DialogStore
 *
 * Tracks whether or not modal a modal dialog is open, and whether it should
 * be closed based on various actions.
 */

define([

  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',
  'constants/ActionTypes'

], function(AppDispatcher, MicroEvent, ActionTypes) {

  var _isEditing = false;
  var _isShown = false;

  var DialogStore = {
    getIsEditing: function() {
      return _isEditing;
    },

    getIsShown: function() {
      return _isShown;
    }
  };

  MicroEvent.mixin(DialogStore);

  AppDispatcher.register(function(payload) {
    debugger;
    switch(payload.eventName) {
      case ActionTypes.WORKOUT_ADD:
      case ActionTypes.WORKOUT_DELETE:
        _isShown = false;
        DialogStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.WORKOUT_EDIT:
        _isEditing = false;
        DialogStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return DialogStore;

});
