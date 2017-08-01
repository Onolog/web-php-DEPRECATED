const PropTypes = require('prop-types');
var React = require('react');
var cx = require('classnames');

const DIRECTION = {
  left: 'left',
  right: 'right',
  both: 'both',
};

/**
 * LeftRight.react.js
 *
 * Simple left right positioning tool.
 */
const LeftRight = React.createClass({
  displayName: 'LeftRight',

  propTypes: {
    direction: PropTypes.oneOf(Object.keys(DIRECTION)),
  },

  getDefaultProps: function() {
    return {
      direction: DIRECTION.both,
    };
  },

  render: function() {
    var children = [];
    React.Children.forEach(this.props.children, child => {
      children.push(child);
    });

    var dir = this.props.direction || DIRECTION.both;
    var both = (dir === DIRECTION.both);

    var firstClass = both || dir === DIRECTION.left ? 'pull-left' : '';

    var secondClass = both || dir === DIRECTION.right ? 'pull-right' : '';

    var firstChild =
      <div className={firstClass} key="left">
        {children[0]}
      </div>;

    var secondChild = (children.length < 2) ? null :
      <div className={secondClass} key="right">
        {children[1]}
      </div>;

    var orderedChildren = (dir === DIRECTION.right && secondChild) ?
      [secondChild, firstChild] :
      [firstChild, secondChild];

    return (
      <div
        {...this.props}
        className={cx(this.props.className, 'clearfix')}>
        {orderedChildren}
      </div>
    );
  },
});

module.exports = LeftRight;
