var React = require('react');

/**
 * FileInput.react
 * @jsx React.DOM
 *
 * React wrapper around a standard file input.
 */
var FileInput = React.createClass({
  displayName: 'FileInput',

  render: function() {
    return (
      <input
        {...this.props}
        type="file"
      />
    );
  }
});

module.exports = FileInput;
