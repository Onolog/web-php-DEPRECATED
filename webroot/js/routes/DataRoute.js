module.exports = {
  path: 'data',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('controllers/DataController.react'));
    });
  },
};
