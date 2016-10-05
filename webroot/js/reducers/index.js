import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';

import activities from './activities';
import brands from './brands';
import navigation from './navigation';
import session from './session';
import shoes from './shoes';
import users from './users';

export default combineReducers({
  activities,
  brands,
  navigation,
  routing,
  session,
  shoes,
  users,
});
