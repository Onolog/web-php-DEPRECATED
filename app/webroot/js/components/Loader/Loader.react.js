/**
 * Loader.react
 *
 * Displays a loading indicator.
 *
 * @jsx React.DOM
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'Loader',

    render: function() {
      return (
        <div className="loader loader-lg" />
      );
    }
  });

});
