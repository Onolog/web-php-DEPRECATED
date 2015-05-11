/**
 * ActionTypes.js
 *
 * Defines a set of actions for the dispatcher to emit and stores to handle.
 */
define({
  // Some change occured, necessitating an update
  CHANGE: 'change',

  /**
   * Individual items
   */

  // Adding an item
  SHOE_ADD: 'shoe-add',
  SHOE_ADD_ERROR: 'shoe-add-error',
  WORKOUT_ADD: 'workout-add',
  WORKOUT_ADD_ERROR: 'workout-add-error',

  // Canceling an action
  SHOE_CANCEL: 'shoe-cancel',
  WORKOUT_CANCEL: 'workout-cancel',

  // Deleting an item
  SHOE_DELETE: 'shoe-delete',
  SHOE_DELETE_ERROR: 'shoe-delete-error',
  WORKOUT_DELETE: 'workout-delete',
  WORKOUT_DELETE_ERROR: 'workout-delete-error',

  // Editing an item
  SHOE_EDIT: 'shoe-edit',
  SHOE_EDIT_ERROR: 'shoe-edit-error',
  WORKOUT_EDIT: 'workout-edit',
  WORKOUT_EDIT_ERROR: 'workout-edit-error',

  // TODO: Is there a better way to handle this action?
  SHOE_INIT: 'shoe-init',
  WORKOUT_INIT: 'workout-init',

  // Updating the store's local state of an item
  SHOE_UPDATE: 'shoe-update',
  WORKOUT_UPDATE: 'workout-update',

  // Fetching the data for a single item
  SHOE_VIEW: 'shoe-view',
  SHOE_VIEW_ERROR: 'shoe-view-error',
  WORKOUT_VIEW: 'workout-view',
  WORKOUT_VIEW_ERROR: 'workout-view-error',

  /**
   * Actions for collections
   */
  ALL_SHOES_FETCH: 'all-shoes-fetch',
  ALL_SHOES_FETCH_ERROR: 'all-shoes-fetch-error',
  WORKOUTS_FETCH: 'workouts-fetch',
  WORKOUTS_FETCH_ERROR: 'workouts-fetch-error'
});
