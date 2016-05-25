import AppDispatcher from 'flux/AppDispatcher';
import MicroEvent from 'lib/microevent';
import UserActions from 'flux/actions/UserActions';

import {CHANGE, USER_LOGIN, USER_LOGOUT, USER_SESSION, USER_SETTINGS_SAVE} from 'flux/ActionTypes';

let _user = window.APP_DATA.user || {id: 0};
let _session = null;

/**
 * UserStore
 *
 * Keeps track of the user's info and login state.
 */
const UserStore = {
  getUser() {
    return _user;
  },

  getUserId() {
    return parseInt(_user.id, 10);
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
    case USER_LOGIN:
      // TODO: Figure out why this action doesn't get heard.
      break;
    case USER_LOGOUT:
      _session = null;
      _user = null;
      break;
    case USER_SESSION:
      let {session, user} = data;
      _session = session;
      _user = user;
      break;
    case USER_SETTINGS_SAVE:
      _user = data || {};
      break;
  }
  UserStore.trigger(CHANGE);
  return true;
});

module.exports = UserStore;
