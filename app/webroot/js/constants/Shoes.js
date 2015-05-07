/**
 * Constants associated with shoes
 */
define({
  // Endpoints for mutating and viewing workouts
  ENDPOINT: {
    SHOE_ADD:    '/ajax/shoe/add/',
    SHOE_DELETE: '/ajax/shoe/delete/',
    SHOE_EDIT:   '/ajax/shoe/edit/',
    SHOE_VIEW:   '/ajax/shoe/view/',
  },

  // For integration with CakePHP, we need to use specific naming
  FORM_NAME: 'Shoe',

  // Shoes don't have a real ID until they are saved to the DB
  NEW_ID: 'new-id',
});
