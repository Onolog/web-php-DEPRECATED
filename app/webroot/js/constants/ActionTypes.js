/**
 * ActionTypes.js
 *
 * Defines a set of actions for the dispatcher to emit and stores to handle.
 */
define({
  // Some change occured, necessitating an update
  CHANGE: 'change',

  CALENDAR_INIT: 'calendar-init',
  CALENDAR_INIT_ERROR: 'calendar-init-error',
  CALENDAR_INIT_SUCCESS: 'calendar-init-success',

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
  WORKOUT_VIEW_SUCCESS: 'workout-view-success'
});
