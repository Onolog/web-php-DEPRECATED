import {values} from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';
import routes from 'routes';

import ActionTypes from 'constants/ActionTypes';

// Construct the map of possible requests. Initialize each to false.
const pendingRequests = {};
values(ActionTypes).forEach(action => pendingRequests[action] = false);

const initialState = {
  activities: [],
  activitySummary: {},
  brands: [],
  error: null,
  garminData: {},
  navigation: {
    sideNavOpen: JSON.parse(localStorage.getItem('sideNavOpen')) || false,
  },
  pendingRequests,
  session: {},
  shoes: [],
  users: [],

  // Merge app data from server.
  ...window.APP_DATA,
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
