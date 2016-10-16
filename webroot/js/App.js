import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';
import routes from 'routes';

const initialState = {
  ...window.APP_DATA,
  navigation: {
    sideNavOpen: JSON.parse(localStorage.getItem('sideNavOpen')),
  },
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
