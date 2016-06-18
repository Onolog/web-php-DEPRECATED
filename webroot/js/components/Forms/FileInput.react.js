import React from 'react';

/**
 * FileInput.react
 *
 * React wrapper around a standard file input.
 */
const FileInput = React.createClass({
  displayName: 'FileInput',

  render: function() {
    return <input {...this.props} type="file" />;
  },
});

module.exports = FileInput;
