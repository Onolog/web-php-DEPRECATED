module.exports = {
  path: ':year/:month',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('controllers/CalendarController.react'));
    });
  },
};
