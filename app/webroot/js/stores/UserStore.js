var _ = require('underscore');

var ActionTypes = require('../constants/ActionTypes');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MicroEvent = require('../lib/MicroEvent/microevent');
var UserActions = require('../actions/UserActions');

var homeUrl = require('../utils/homeUrl');

var _user = window.app && window.app.user;

/**
 * UserStore
 *
 * Keeps track of the user's info and login state.
 */
var UserStore = {
  getUser: function() {
    if (!_user) {
      UserActions.getSession();
    }
    return _user;
  }
};

MicroEvent.mixin(UserStore);

AppDispatcher.register(function(payload) {
  switch(payload.eventName) {
    case ActionTypes.USER_LOGIN:
      // TODO: Figure out why this action doesn't get heard.
      break;
    case ActionTypes.USER_SESSION:
      _user = payload.data || {};
      break;
    case ActionTypes.USER_LOGOUT:
      _user = null;
      break;
  }
  UserStore.trigger(ActionTypes.CHANGE);
  return true;
});

module.exports = UserStore;
