/**
 * reactRender.js
 *
 * Convenience wrapper for instantiating and rendering React components.
 */
import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';

const initialState = {shoes: window.APP_DATA.shoes};
const appStore = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

module.exports = (Component, props={}) => {
  render(
    <Provider store={appStore}>
      <Component {...props} />
    </Provider>,
    document.getElementById('root')
  );
};
