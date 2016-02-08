/**
 * reactRender.js
 *
 * Convenience wrapper for instantiating and rendering React components.
 */
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';

function reactRender(/*object*/ Component, /*object*/ props) {
  props = props || {};
  ReactDOM.render(<Component {...props} />, document.getElementById('root'));
}

module.exports = reactRender;
