/**
 * FileInput.react
 * @jsx React.DOM
 *
 * React wrapper around a standard file input.
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
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

});
