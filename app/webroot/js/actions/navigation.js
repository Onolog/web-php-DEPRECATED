import {NAV_TOGGLE} from 'constants/ActionTypes';

export function toggleSideNav(sideNavOpen) {
  return dispatch => {
    sideNavOpen = !sideNavOpen;
    localStorage && localStorage.setItem('sideNavOpen', sideNavOpen);
    dispatch({
      sideNavOpen,
      type: NAV_TOGGLE,
    });
  };
}
