var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var MicroEvent = require('lib/microevent');
var UserActions = require('flux/actions/UserActions');

var _user = window.app && window.app.user;
var _session = null;

/**
 * UserStore
 *
 * Keeps track of the user's info and login state.
 */
var UserStore = {
  getUser() {
    if (!_user) {
      UserActions.getSession();
    }
    return _user;
  },

  getSession() {
    if (!_session) {
      UserActions.getSession();
    }
    return _session;
  },
};

MicroEvent.mixin(UserStore);

AppDispatcher.register(({data, eventName}) => {
  switch(eventName) {
    case ActionTypes.USER_LOGIN:
      // TODO: Figure out why this action doesn't get heard.
      break;
    case ActionTypes.USER_LOGOUT:
      _session = null;
      _user = null;
      break;
    case ActionTypes.USER_SESSION:
      let {session, user} = data;
      _session = session;
      _user = user;
      break;
    case ActionTypes.USER_SETTINGS_SAVE:
      _user = data || {};
      break;
  }
  UserStore.trigger(ActionTypes.CHANGE);
  return true;
});

module.exports = UserStore;
