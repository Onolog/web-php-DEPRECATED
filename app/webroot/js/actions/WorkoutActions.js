/**
 * WorkoutActions.js
 */

define([

  'dispatcher/AppDispatcher',
  'constants/ActionTypes',
  'constants/Workouts',
  'utils/cakePHP',
  'utils/ResponseHandler',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  ActionTypes,
  Workouts,
  cakePHP,
  ResponseHandler,
  jquery

) {

  var ENDPOINT = Workouts.ENDPOINT;
  var FORM_NAME = Workouts.FORM_NAME;

  function _onError(response, eventName) {
    var handler = new ResponseHandler(response);
    AppDispatcher.dispatch({
      eventName: eventName,
      alertMessage: handler.getMessage()
    });
  }

  return {

    initWorkout: function(workoutData) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_INIT,
        workout: workoutData
      });
    },

    addWorkout: function(workoutData) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_ADD,
        workout: workoutData
      });

      // Add the new workout to the DB
      $.ajax({
        url: ENDPOINT.WORKOUT_ADD + workoutData.date,
        type: 'POST',
        data: cakePHP.encodeFormData(workoutData, FORM_NAME),
        success: this.onAddWorkoutSuccess,
        error: this.onAddWorkoutError
      });
    },

    onAddWorkoutSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.WORKOUT_ADD_SUCCESS,
          workout: handler.getPayload()
        });
      } else {
        _onError(response, ActionTypes.WORKOUT_ADD_ERROR);
      }
    },

    onAddWorkoutError: function(response) {
      _onError(response, ActionTypes.WORKOUT_ADD_ERROR);
    },

    cancelAddWorkout: function() {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_ADD_CANCEL
      });
    },

    deleteWorkout: function(workoutID) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_DELETE,
        workoutID: workoutID
      });

      // Delete the workout from the DB
      $.ajax({
        url: ENDPOINT.WORKOUT_DELETE + workoutID,
        type: 'POST',
        success: this.onDeleteWorkoutSuccess,
        error: this.onDeleteWorkoutError
      });
    },

    onDeleteWorkoutSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.WORKOUT_DELETE_SUCCESS,
          workoutID: handler.getPayload()
        });
      } else {
        _onError(response, ActionTypes.WORKOUT_DELETE_ERROR);
      }
    },

    onDeleteWorkoutError: function(response) {
      _onError(response, ActionTypes.WORKOUT_DELETE_ERROR);
    },

    startEditWorkout: function(workoutData) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_EDIT_START,
        workoutData: workoutData
      });
    },

    cancelEditWorkout: function(workoutID) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_EDIT_CANCEL,
        workoutID: workoutID
      });
    },

    /**
     * Updates the temporary state of a workout, whie editing or adding.
     */
    updateWorkout: function(/*string*/ field, /*?any*/ value) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_UPDATE,
        field: field,
        value: value
      });
    },

    /**
     * Save an edited workout to the DB
     */
    saveWorkout: function(workoutData) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_EDIT_SAVE,
        workout: workoutData
      });

      // Update the workout in the DB
      $.ajax({
        url: ENDPOINT.WORKOUT_EDIT + workoutData.id,
        type: 'POST',
        data: cakePHP.encodeFormData(workoutData, FORM_NAME),
        success: this.onSaveWorkoutSuccess,
        error: this.onSaveWorkoutError
      });
    },

    onSaveWorkoutSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.WORKOUT_EDIT_SUCCESS,
          alertMessage: handler.getMessage(),
          workout: handler.getPayload()
        });
      } else {
        _onError(response, ActionTypes.WORKOUT_EDIT_ERROR);
      }
    },

    onSaveWorkoutError: function(/*string|object*/ response) {
      _onError(response, ActionTypes.WORKOUT_EDIT_ERROR);
    },

    viewWorkout: function(workoutID) {
      AppDispatcher.dispatch({
        eventName: ActionTypes.WORKOUT_VIEW,
        id: workoutID
      });

      // Fetch the workout from the DB
      $.ajax({
        url: ENDPOINT.WORKOUT_VIEW + workoutID,
        type: 'GET',
        success: this.onViewWorkoutSuccess,
        error: this.onViewWorkoutError
      });
    },

    onViewWorkoutSuccess: function(/*string*/ response) {
      var handler = new ResponseHandler(response);
      if (handler.getWasSuccessful()) {
        AppDispatcher.dispatch({
          eventName: ActionTypes.WORKOUT_VIEW_SUCCESS,
          workout: handler.getPayload()
        });
      } else {
        _onError(response, ActionTypes.WORKOUT_VIEW_ERROR);
      }
    },

    onViewWorkoutError: function(/*string|object*/ response) {
      _onError(response, ActionTypes.WORKOUT_VIEW_ERROR);
    }
  };

});
