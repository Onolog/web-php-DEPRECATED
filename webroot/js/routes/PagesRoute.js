module.exports = {
  childRoutes: [{
    path: 'chart',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('controllers/ChartController.react'));
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
