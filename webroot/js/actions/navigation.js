import {ACTIVITY_MODAL_HIDE, NAV_TOGGLE} from 'constants/ActionTypes';

export function toggleSideNav() {
  return (dispatch, getState) => {
    const sideNavOpen = !getState().navigation.sideNavOpen;
    localStorage && localStorage.setItem('sideNavOpen', sideNavOpen);
    dispatch({
      sideNavOpen,
      type: NAV_TOGGLE,
    });
  };
}

export function hideActivityModal() {
  return dispatch => dispatch({type: ACTIVITY_MODAL_HIDE});
}
