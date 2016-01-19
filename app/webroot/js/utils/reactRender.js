/**
 * reactRender.js
 *
 * Convenience wrapper for instantiating and rendering React components.
 */
var React = require('react');
var ReactDOM = require('react-dom');

function reactRender(/*object*/ Component, /*object*/ props) {
  props = props || {};

  ReactDOM.render(
    <Component {...props} />,
    document.getElementById('root')
  );
};

module.exports = reactRender;
