module.exports = {
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require('controllers/TermsController.react'));
    });
  },
  path: 'terms',
};
