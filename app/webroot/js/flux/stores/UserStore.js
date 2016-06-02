import AppDispatcher from 'flux/AppDispatcher';
import MicroEvent from 'lib/microevent';

import {CHANGE, USER_LOGOUT, USER_SETTINGS_SAVE} from 'flux/ActionTypes';

let _user = window.APP_DATA.user || {id: 0};

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
};

MicroEvent.mixin(UserStore);

AppDispatcher.register(({data, eventName}) => {
  switch(eventName) {
    case USER_SETTINGS_SAVE:
      _user = data || {};
      break;
  }
  UserStore.trigger(CHANGE);
  return true;
});

module.exports = UserStore;
