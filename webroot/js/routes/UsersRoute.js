module.exports = {
  childRoutes: [{
    path: ':userId',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('controllers/ProfileController.react'));
      });
    },
  }],
  path: 'users',
};
