/**
 * Image.react
 * @jsx React.DOM
 *
 * React wrapper around standard HTML <img> tag
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'Image',

    render: function() {
      return <img {...this.props} />;
    }
  });

});
