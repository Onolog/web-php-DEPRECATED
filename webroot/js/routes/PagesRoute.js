module.exports = {
  childRoutes: [{
    path: 'data',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('controllers/DataController.react'));
      });
    },
  }, {
    path: 'garmin',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('controllers/GarminController.react'));
      });
    },
  }],
  path: 'pages',
};
