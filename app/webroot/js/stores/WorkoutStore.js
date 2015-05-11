/**
 * WorkoutStore
 *
 * Keeps track of a single workout. Used when adding or editing a workout,
 * for example.
 *
 * NOTE: Not to be confused with WorkoutsStore (plural).
 */

define([

  'constants/ActionTypes',
  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',
  'lib/jquery/jquery.min'

], function(

  ActionTypes,
  AppDispatcher,
  MicroEvent

) {

  var _workout;
  var _initialWorkout;

  function _resetData() {
    _workout = {};
    _initialWorkout = {};
  }

  function _copy(obj) {
    return $.extend(true, {}, obj);
  }
  _resetData();

  var WorkoutStore = {
    /**
     * Check whether or not the workout has been modified
     */
    getHasEdits: function() {
      return JSON.stringify(_workout) !== JSON.stringify(_initialWorkout);
    },

    getWorkout: function() {
      return _workout;
    }
  };

  MicroEvent.mixin(WorkoutStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
      case ActionTypes.WORKOUT_INIT:
      case ActionTypes.WORKOUT_EDIT_START:
        _workout = _copy(payload.workout);
        _initialWorkout = _copy(payload.workout);
        break;

      case ActionTypes.WORKOUT_UPDATE:
        var field = payload.field;
        var value = payload.value;

        _workout[field] = value;
        if (!value || ($.isArray(value) && !value.length)) {
          // Remove null values
          delete _workout[field];
        }
        WorkoutStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.WORKOUT_ADD_CANCEL:
      case ActionTypes.WORKOUT_ADD_SUCCESS:
      case ActionTypes.WORKOUT_EDIT_CANCEL:
      case ActionTypes.WORKOUT_EDIT_SUCCESS:
      case ActionTypes.WORKOUT_DELETE_SUCCESS:
        // When cancelling and add/edit action, or when an action was
        // successful, reset the data.
        _resetData();
        WorkoutStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return WorkoutStore;

});
