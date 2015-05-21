/**
 * Textarea.react
 * @jsx React.DOM
 *
 * React wrapper around a standard textarea.
 */
define([

  'lib/react/react',
  'utils/joinClasses'

], function(

  React,
  joinClasses

) {

  return React.createClass({
    displayName: 'Textarea',

    render: function() {
      return (
        <textarea
          {...this.props}
          className={joinClasses(this.props.className, 'form-control')}
        />
      );
    }
  });

});
