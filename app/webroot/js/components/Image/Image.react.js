var React = require('react');

/**
 * Image.react
 * @jsx React.DOM
 *
 * React wrapper around standard HTML <img> tag
 */
var Image = React.createClass({
  displayName: 'Image',

  render: function() {
    return <img {...this.props} />;
  }
});

module.exports = Image;
