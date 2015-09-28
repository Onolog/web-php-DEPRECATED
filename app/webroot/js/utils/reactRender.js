/**
 * reactRender.js
 *
 * Convenience wrapper for instantiating and rendering React components.
 */
var React = require('react');

function reactRender(/*object*/ Component, /*object*/ props) {
  props = props || {};

  React.render(
    <Component {...props} />,
    document.getElementById('root')
  );
};

module.exports = reactRender;
