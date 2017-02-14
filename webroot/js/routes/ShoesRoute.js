module.exports = {
  childRoutes: [{
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('controllers/ShoeController.react'));
      });
    },
    path: ':shoeId',
  }],
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('controllers/ShoesController.react'));
      });
    },
  },
  path: 'shoes',
};
