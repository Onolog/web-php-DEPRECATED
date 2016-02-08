/**
 * Constants associated with shoes
 */
module.exports = {
  // Endpoints for mutating and viewing workouts
  ENDPOINT: {
    FETCH:  '/ajax/shoes/all',
    ADD:    '/ajax/shoes/add/',
    DELETE: '/ajax/shoes/delete/',
    EDIT:   '/ajax/shoes/edit/',
    VIEW:   '/ajax/shoes/view/',
  },

  // For integration with CakePHP, we need to use specific naming
  FORM_NAME: 'Shoe',

  // Shoes don't have a real ID until they are saved to the DB
  NEW_ID: 'new-id',
};
