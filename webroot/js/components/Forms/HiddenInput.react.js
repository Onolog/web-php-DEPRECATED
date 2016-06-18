import React from 'react';

/**
 * HiddenInput.react
 *
 * React wrapper around a standard hidden input element.
 */
const HiddenInput = React.createClass({
  displayName: 'HiddenInput',

  render: function() {
    return <input {...this.props} type="hidden" />;
  },
});

module.exports = HiddenInput;
