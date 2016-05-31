/**
 * ActionTypes.js
 *
 * Defines a set of actions for the dispatcher to emit and stores to handle.
 */
module.exports = {
  // Some change occured, necessitating an update
  CHANGE: 'change',

  /**
   * Individual items
   */

  // Adding an item
  SHOE_ADD: 'shoe-add',
  SHOE_ADD_ERROR: 'shoe-add-error',
  SHOE_ADD_SUCCESS: 'shoe-add-success',
  WORKOUT_ADD: 'workout-add',
  WORKOUT_ADD_ERROR: 'workout-add-error',

  // Deleting an item
  SHOE_DELETE: 'shoe-delete',
  SHOE_DELETE_ERROR: 'shoe-delete-error',
  SHOE_DELETE_SUCCESS: 'shoe-delete-success',
  WORKOUT_DELETE: 'workout-delete',
  WORKOUT_DELETE_ERROR: 'workout-delete-error',

  // Editing an item
  SHOE_UPDATE: 'shoe-update',
  SHOE_UPDATE_ERROR: 'shoe-update-error',
  SHOE_UPDATE_SUCCESS: 'shoe-update-success',
  WORKOUT_UPDATE: 'workout-update',
  WORKOUT_UPDATE_ERROR: 'workout-update-error',

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
  ALL_SHOES_FETCH_SUCCESS: 'all-shoes-fetch-success',
  BRANDS_FETCH: 'brands-fetch',
  BRANDS_FETCH_ERROR: 'brands-fetch-error',
  WORKOUTS_FETCH: 'workouts-fetch',
  WORKOUTS_FETCH_ERROR: 'workouts-fetch-error',

  // User-related actions
  USER_LOGIN: 'user-login',
  USER_LOGOUT: 'user-logout',
  USER_SESSION: 'user-session',
  USER_SETTINGS_SAVE: 'user-settings-save',
  USER_SETTINGS_SAVE_ERROR: 'user-settings-save-error',

  // Nav
  NAV_TOGGLE: 'nav-toggle',
};
