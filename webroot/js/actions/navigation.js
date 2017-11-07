// @flow

import {ACTIVITY_MODAL_HIDE, NAV_TOGGLE} from 'constants/ActionTypes';

export function toggleSideNav(): Function {
  return (dispatch: Function, getState: Function) => {
    const sideNavOpen = !getState().navigation.sideNavOpen;
    localStorage && localStorage.setItem('sideNavOpen', sideNavOpen);
    dispatch({
      sideNavOpen,
      type: NAV_TOGGLE,
    });
  };
}

export function hideActivityModal(): Function {
  return (dispatch) => dispatch({type: ACTIVITY_MODAL_HIDE});
}
