/**
 * WorkoutActions.js
 */

define([

  'dispatcher/AppDispatcher',
  'constants/ActionTypes',
  'constants/Workouts',
  'utils/ActionUtils',
  'utils/cakePHP',
  'lib/jquery/jquery.min'

], function(

  AppDispatcher,
  ActionTypes,
  Workouts,
  ActionUtils,
  cakePHP,
  jquery

) {

  var ENDPOINT = Workouts.ENDPOINT;
  var FORM_NAME = Workouts.FORM_NAME;

  return {

    add: function(workout) {
      // Add the new workout to the DB
      $.ajax({
        url: ENDPOINT.WORKOUT_ADD + workout.date,
        type: 'POST',
        data: cakePHP.encodeFormData(workout, FORM_NAME),
        success: this.onAddSuccess,
        error: this.onAddError
      });
    },

    onAddSuccess: function(/*string*/ response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.WORKOUT_ADD,
        ActionTypes.WORKOUT_ADD_ERROR
      );
    },

    onAddError: function(response) {
      ActionUtils.onError(response, ActionTypes.WORKOUT_ADD_ERROR);
    },

    delete: function(workoutID) {
      // Delete the workout from the DB
      $.ajax({
        url: ENDPOINT.WORKOUT_DELETE + workoutID,
        type: 'POST',
        success: this.onDeleteSuccess,
        error: this.onDeleteError
      });
    },

    onDeleteSuccess: function(/*string*/ response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.WORKOUT_DELETE,
        ActionTypes.WORKOUT_DELETE_ERROR
      );
    },

    onDeleteError: function(response) {
      ActionUtils.onError(response, ActionTypes.WORKOUT_DELETE_ERROR);
    },

    /**
     * Save an edited workout to the DB
     */
    save: function(workoutData) {
      $.ajax({
        url: ENDPOINT.WORKOUT_EDIT + workoutData.id,
        type: 'POST',
        data: cakePHP.encodeFormData(workoutData, FORM_NAME),
        success: this.onSaveSuccess,
        error: this.onSaveError
      });
    },

    onSaveSuccess: function(/*string*/ response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.WORKOUT_UPDATE,
        ActionTypes.WORKOUT_UPDATE_ERROR
      );
    },

    onSaveError: function(/*string|object*/ response) {
      ActionUtils.onError(response, ActionTypes.WORKOUT_UPDATE_ERROR);
    },

    view: function(workoutID) {
      $.ajax({
        url: ENDPOINT.WORKOUT_VIEW + workoutID,
        type: 'GET',
        success: this.onViewSuccess,
        error: this.onViewError
      });
    },

    onViewSuccess: function(/*string*/ response) {
      ActionUtils.onSuccess(
        response,
        ActionTypes.WORKOUT_VIEW,
        ActionTypes.WORKOUT_VIEW_ERROR
      );
    },

    onViewError: function(/*string|object*/ response) {
      ActionUtils.onError(response, ActionTypes.WORKOUT_VIEW_ERROR);
    }
  };

});
