import {NAV_TOGGLE} from 'constants/ActionTypes';

const navigation = (navigation={}, action) => {
  switch(action.type) {
    case NAV_TOGGLE:
      return {
        ...navigation,
        sideNavOpen: action.sideNavOpen,
      };
    default:
      return navigation;
  }
};

export default navigation;
