/**
 * reactRender.js
 *
 * Convenience wrapper for instantiating and rendering React components.
 */
define(['lib/react/react'], function(React) {

  return function(
    /*object*/ component,
    /*object*/ options,
    /*string*/ id
  ) {
    React.render(
      React.createElement(component, options),
      document.getElementById(id)
    );
  };

});
