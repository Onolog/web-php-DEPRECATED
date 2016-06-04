import {combineReducers} from 'redux';

import brands from './brands';
import navigation from './navigation';
import session from './session';
import shoes from './shoes';

export default combineReducers({
  // activities,
  brands,
  navigation,
  session,
  shoes,
  // users,
});
