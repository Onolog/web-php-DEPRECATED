import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';

import activities from './activities';
import activityMetrics from './activityMetrics';
import activitySummary from './activitySummary';
import brands from './brands';
import error from './error';
import garminData from './garminData';
import navigation from './navigation';
import pendingRequests from './pendingRequests';
import session from './session';
import shoes from './shoes';
import users from './users';

export default combineReducers({
  activities,
  activityMetrics,
  activitySummary,
  brands,
  error,
  garminData,
  navigation,
  pendingRequests,
  routing,
  session,
  shoes,
  users,
});
