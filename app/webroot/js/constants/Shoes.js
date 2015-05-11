/**
 * Constants associated with shoes
 */
define({
  // Endpoints for mutating and viewing workouts
  ENDPOINT: {
    ALL_SHOES_FETCH: '/ajax/shoes/all',
    SHOE_ADD:        '/ajax/shoes/add/',
    SHOE_DELETE:     '/ajax/shoes/delete/',
    SHOE_EDIT:       '/ajax/shoes/edit/',
    SHOE_VIEW:       '/ajax/shoes/view/'
  },

  // For integration with CakePHP, we need to use specific naming
  FORM_NAME: 'Shoe',

  // Shoes don't have a real ID until they are saved to the DB
  NEW_ID: 'new-id',
});
