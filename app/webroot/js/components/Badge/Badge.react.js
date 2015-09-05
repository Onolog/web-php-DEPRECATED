/**
 * Badge.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'utils/joinClasses'

], function(

  React,
  joinClasses

) {

  return React.createClass({
    displayName: 'Badge',

    render: function() {
      return (
        <span className={joinClasses('badge', this.props.className)}>
          {this.props.children}
        </span>
      );
    }
  });

});
