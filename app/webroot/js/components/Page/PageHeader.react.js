/**
 * PageHeader.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',

], function(React, LeftRight) {

  return React.createClass({
    displayName: 'PageHeader',

    propTypes: {
      title: React.PropTypes.string.isRequired
    },

    render: function() {
      return (
        <LeftRight className="pageHeader">
          <h2>{this.props.title}</h2>
          {this.props.children}
        </LeftRight>
      );
    }
  });

});
