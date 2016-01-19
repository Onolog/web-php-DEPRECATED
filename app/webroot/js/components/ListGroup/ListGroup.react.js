var React = require('react');

var cx = require('classnames');

/**
 * ListGroup.react
 */
var ListGroup = React.createClass({
  displayName: 'ListGroup',

  render: function() {
    return (
      <div className={cx('list-group', this.props.className)}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ListGroup;
