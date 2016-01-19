var React = require('react');

/**
 * HiddenInput.react
 *
 * React wrapper around a standard hidden input element.
 */
var HiddenInput = React.createClass({
  displayName: 'HiddenInput',

  render: function() {
    return (
      <input
        {...this.props}
        type="hidden"
      />
    );
  }
});

module.exports = HiddenInput;
