module.exports = {
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('controllers/PrivacyController.react'));
    });
  },
  path: 'privacy',
};
