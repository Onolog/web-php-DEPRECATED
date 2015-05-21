/**
 * TextInput.react
 * @jsx React.DOM
 *
 * React wrapper around a standard text input.
 */
define([

  'lib/react/react',
  'utils/joinClasses'

], function(

  React,
  joinClasses

) {

  return React.createClass({
    displayName: 'TextInput',

    render: function() {
      return (
        <input
          {...this.props}
          className={joinClasses(this.props.className, 'form-control')}
          type="text"
        />
      );
    }
  });

});
