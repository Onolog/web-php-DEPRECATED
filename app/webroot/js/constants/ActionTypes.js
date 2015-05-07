/**
 * ActionTypes.js
 *
 * Defines a set of actions for the dispatcher to emit and stores to handle.
 */
define({
  // Some change occured, necessitating an update
  CHANGE: 'change',

  // All Shoes
  ALL_SHOES_FETCH: 'all-shoes-fetch',
  ALL_SHOES_FETCH_ERROR: 'all-shoes-fetch-error',
  ALL_SHOES_FETCH_SUCCESS: 'all-shoes-fetch-success',

  // Individual Shoe
  SHOE_DELETE: 'shoe-delete',
  SHOE_EDIT: 'shoe-edit',
  SHOE_VIEW: 'shoe-view',

  // Workout Actions
  WORKOUT_ADD: 'workout-add',
  WORKOUT_ADD_CANCEL: 'workout-add',
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

  WORKOUT_INIT: 'workout-init',

  WORKOUT_UPDATE: 'workout-update',

  WORKOUT_VIEW: 'workout-view',
  WORKOUT_VIEW_ERROR: 'workout-view-error',
  WORKOUT_VIEW_SUCCESS: 'workout-view-success',

  // Fetch a set of workouts from the server
  WORKOUTS_FETCH: 'workouts-fetch',
  WORKOUTS_FETCH_ERROR: 'workouts-fetch-error',
  WORKOUTS_FETCH_SUCCESS: 'workouts-fetch-success'
});
