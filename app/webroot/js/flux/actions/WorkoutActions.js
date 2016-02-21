import $ from 'jquery';

import ActionTypes from 'flux/ActionTypes';
import ActionUtils from 'flux/actions/ActionUtils';

import {encodeFormData} from 'utils/cakePHP';

const FORM_NAME = 'Workout';

/**
 * WorkoutActions.js
 */
const WorkoutActions = {
  add: function(activity) {
    $.post('/ajax/workouts/add/', encodeFormData(activity, FORM_NAME))
      .done(this.onAddSuccess)
      .fail(this.onAddError);
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

  delete: function(activityId) {
    $.post(`/ajax/workouts/delete/${activityId}`)
      .done(this.onDeleteSuccess)
      .fail(this.onDeleteError);
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
  save: function(activity) {
    let data = encodeFormData(activity, FORM_NAME);
    $.post(`/ajax/workouts/edit/${activity.id}`, data)
      .done(this.onSaveSuccess)
      .fail(this.onSaveError);
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

  view: function(activityId) {
    $.get(`/ajax/workouts/view/${activityId}`)
      .done(this.onViewSuccess)
      .fail(this.onViewError);
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
  },
};

module.exports = WorkoutActions;
