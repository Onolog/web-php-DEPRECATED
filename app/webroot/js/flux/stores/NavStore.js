import {CHANGE, NAV_TOGGLE} from 'flux/ActionTypes';
import AppDispatcher from 'flux/AppDispatcher';
import MicroEvent from 'lib/microevent';

const SIDE_NAV_OPEN = 'sideNavOpen';

let _sideNavOpen = false;

/**
 * NavStore
 */
const NavStore = {
  isSideNavOpen() {
    if (localStorage) {
      _sideNavOpen = JSON.parse(localStorage.getItem(SIDE_NAV_OPEN));
    }
    return _sideNavOpen;
  },
};

MicroEvent.mixin(NavStore);

AppDispatcher.register(({eventName}) => {
  switch (eventName) {
    case NAV_TOGGLE:
      _sideNavOpen = !_sideNavOpen;
      localStorage && localStorage.setItem(SIDE_NAV_OPEN, _sideNavOpen);
      NavStore.trigger(CHANGE);
      break;
  }
  return true;
});

module.exports = NavStore;
