module.exports = {
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require('controllers/SettingsController.react'));
    });
  },
  path: 'settings',
};
