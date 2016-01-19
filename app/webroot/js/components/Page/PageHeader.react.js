var React = require('react');

var LeftRight = require('components/LeftRight/LeftRight.react');

/**
 * PageHeader.react
 */
var PageHeader = React.createClass({
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

module.exports = PageHeader;
