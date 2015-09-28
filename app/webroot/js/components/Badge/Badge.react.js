var React = require('react');

var cx = require('classnames');

/**
 * Badge.react
 * @jsx React.DOM
 */
var Badge = React.createClass({
  displayName: 'Badge',

  render: function() {
    return (
      <span className={cx('badge', this.props.className)}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Badge;
