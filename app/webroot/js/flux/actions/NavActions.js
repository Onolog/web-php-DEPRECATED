import {NAV_TOGGLE} from 'flux/ActionTypes';
import AppDispatcher from 'flux/AppDispatcher';

/**
 * NavActions.js
 *
 * Global action for opening and closing the app page's side navigation.
 */
module.exports = {
  toggleSideNav() {
    AppDispatcher.dispatch({eventName: NAV_TOGGLE});
  },
};
