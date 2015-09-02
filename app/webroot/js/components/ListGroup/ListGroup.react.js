/**
 * ListGroup.react
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
    displayName: 'ListGroup',

    render: function() {
      return (
        <div className={joinClasses('list-group', this.props.className)}>
          {this.props.children}
        </div>
      );
    }

  });
});
