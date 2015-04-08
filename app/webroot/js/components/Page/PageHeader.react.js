/**
 * PageHeader.react
 * @jsx React.DOM
 */

define([

  'lib/react/react'
  'lib/react/jsx!components/LeftRight/LeftRight.react',

], function(

  React,
  LeftRight

) {

  return React.createClass({
  
    render: function() {
      return (
        <LeftRight id="pageHeader">
          <h2>{this.props.title}</h2>
          {this.props.actions}
        </LeftRight>
      );
    }

  });

});
