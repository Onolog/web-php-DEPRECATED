/**
 * Constants associated with workouts
 */
define({
  // Endpoints for mutating and viewing workouts
  ENDPOINT: {
    WORKOUT_ADD:    '/ajax/workouts/add/',
    WORKOUT_DELETE: '/ajax/workouts/delete/',
    WORKOUT_EDIT:   '/ajax/workouts/edit/',
    WORKOUT_VIEW:   '/ajax/workouts/view/',
  },

  // For integration with CakePHP, we need to use specific naming
  FORM_NAME: 'Workout',

  // Workouts don't have a real ID until they are saved to the DB
  NEW_ID: 'new-id',
});
