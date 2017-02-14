module.exports = {
  childRoutes: [{
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('controllers/ActivityController.react'));
      });
    },
    path: ':activityId',
  }],
  path: 'activities',
};
