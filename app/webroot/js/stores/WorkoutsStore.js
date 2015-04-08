/**
 * WorkoutsStore
 *
 * Keeps track of all workouts loaded for a particular view.
 *
 * NOTE: We're currently loading the workouts into the store from the view.
 * It may be better to do this from the store directly.
 */

define([

  'dispatcher/AppDispatcher',
  'lib/MicroEvent/microevent',

  'constants/ActionTypes',
  'constants/Workouts',

  'utils/cakePHP',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  MicroEvent,

  ActionTypes,
  Workouts,

  cakePHP

) {

  var NEW_ID = Workouts.NEW_ID;
  var _workouts = [];
  var _cachedWorkouts = [];

  var WorkoutsStore = {

    getWorkouts: function() {
      return _workouts;
    },

    getWorkoutByID: function(/*number*/ workoutID) {
      return _workouts.filter(function(workout) {
        return +workout.id === +workoutID
      })[0];
    },

    /**
     * Checks whether all the workout data has already been fetched from the
     * server and stored.
     */
    getIsCached: function(/*number*/ workoutID) /*bool*/ {
      return $.inArray(workoutID, _cachedWorkouts) !== -1;
    }
  };

  MicroEvent.mixin(WorkoutsStore);

  AppDispatcher.register(function(payload) {
    switch(payload.eventName) {

      case ActionTypes.CALENDAR_INIT_SUCCESS:
        _workouts = payload.workouts;
        WorkoutsStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.WORKOUT_ADD_SUCCESS:
        _workouts.push(payload.workout);
        WorkoutsStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.WORKOUT_DELETE_SUCCESS:
        _workouts = _workouts.filter(function(workout) {
          return workout.id !== payload.workoutID;
        });
        WorkoutsStore.trigger(ActionTypes.CHANGE);
        break;

      case ActionTypes.WORKOUT_EDIT_SUCCESS:
      case ActionTypes.WORKOUT_VIEW_SUCCESS:
        var workoutID = payload.workout.id;
        _workouts = _workouts.map(function(workout) {
          return workout.id === workoutID ? payload.workout : workout;
        });
        _cachedWorkouts.push(workoutID);
        WorkoutsStore.trigger(ActionTypes.CHANGE);
        break;
    }
    return true;
  });

  return WorkoutsStore;

});
