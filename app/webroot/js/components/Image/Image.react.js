import React from 'react';

/**
 * Image.react
 *
 * React wrapper around standard HTML <img> tag
 */
const Image = React.createClass({
  displayName: 'Image',

  render: function() {
    return <img {...this.props} />;
  },
});

module.exports = Image;
