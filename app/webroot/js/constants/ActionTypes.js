/**
 * ActionTypes.js
 *
 * Defines a set of actions for the dispatcher to emit and stores to handle.
 */
define({
  // Some change occured, necessitating an update
  CHANGE: 'change',

  /**
   * Individual actions
   */

  // Single Shoe
  SHOE_ADD: 'shoe-add',
  SHOE_ADD_CANCEL: 'shoe-add-cancel',
  SHOE_ADD_ERROR: 'shoe-add-error',

  SHOE_DELETE: 'shoe-delete',
  SHOE_DELETE_ERROR: 'shoe-delete-error',

  SHOE_EDIT_CANCEL: 'shoe-edit-cancel',
  SHOE_EDIT_ERROR: 'shoe-edit-error',
  SHOE_EDIT_SAVE: 'shoe-edit-save',
  SHOE_EDIT_START: 'shoe-edit-start',
  SHOE_EDIT_SUCCESS: 'shoe-edit-success',
  SHOE_EDIT_UPDATE: 'shoe-edit-update',

  SHOE_VIEW: 'shoe-view',
  SHOE_VIEW_ERROR: 'shoe-view-error',

  // Single Workout
  WORKOUT_ADD: 'workout-add',
  WORKOUT_ADD_CANCEL: 'workout-add-cancel',
  WORKOUT_ADD_ERROR: 'workout-add-error',
  WORKOUT_ADD_SUCCESS: 'workout-add-success',

  WORKOUT_DELETE: 'workout-delete',
  WORKOUT_DELETE_ERROR: 'workout-delete-error',
  WORKOUT_DELETE_SUCCESS: 'workout-delete-success',

  WORKOUT_EDIT_CANCEL: 'workout-edit-cancel',
  WORKOUT_EDIT_ERROR: 'workout-edit-error',
  WORKOUT_EDIT_SAVE: 'workout-edit-save',
  WORKOUT_EDIT_START: 'workout-edit-start',
  WORKOUT_EDIT_SUCCESS: 'workout-edit-success',

  WORKOUT_VIEW: 'workout-view',
  WORKOUT_VIEW_ERROR: 'workout-view-error',
  WORKOUT_VIEW_SUCCESS: 'workout-view-success',

  // TODO: Get rid of these. Init is really the same as WORKOUT_VIEW.
  // "Update" means saving the temp state for a workout. Could be
  // WORKOUT_EDIT_UPDATE?
  WORKOUT_INIT: 'workout-init',
  WORKOUT_UPDATE: 'workout-update',

  /**
   * Actions for collections
   */
  ALL_SHOES_FETCH: 'all-shoes-fetch',
  ALL_SHOES_FETCH_ERROR: 'all-shoes-fetch-error',

  WORKOUTS_FETCH: 'workouts-fetch',
  WORKOUTS_FETCH_ERROR: 'workouts-fetch-error',
  WORKOUTS_FETCH_SUCCESS: 'workouts-fetch-success'
});
