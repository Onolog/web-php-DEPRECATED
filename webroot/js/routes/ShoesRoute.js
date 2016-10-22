module.exports = {
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('controllers/ShoesController.react'));
    });
  },
  path: 'shoes',
};
