/**
 * HiddenInput.react
 * @jsx React.DOM
 *
 * React wrapper around a standard hidden input element.
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
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

});
