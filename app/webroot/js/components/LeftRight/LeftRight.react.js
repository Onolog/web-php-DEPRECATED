/**
 * LeftRight.react.js
 *
 * Simple left right positioning tool.
 */
define([

  'lib/react/react',
  'utils/joinClasses'

], function(

  React,
  joinClasses

) {

  var DIRECTION = {
    left: 'left',
    right: 'right',
    both: 'both'
  };

  return React.createClass({
    displayName: 'LeftRight',

    propTypes: {
      direction: React.PropTypes.oneOf(Object.keys(DIRECTION))
    },

    getDefaultProps: function() {
      return {
        direction: DIRECTION.both
      };
    },

    render: function() {
      var children = [];
      React.Children.forEach(this.props.children, function(child) {
        children.push(child);
      }, this);
  
      var dir = this.props.direction || DIRECTION.both;
      var both = (dir === DIRECTION.both);
  
      var firstClass = both || dir === DIRECTION.left ? 'pull-left' : '';
  
      var secondClass = both || dir === DIRECTION.right ? 'pull-right' : '';
  
      var firstChild =
        <div key="left" className={firstClass}>
          {children[0]}
        </div>;
  
      var secondChild = (children.length < 2) ? null :
        <div key="right" className={secondClass}>
          {children[1]}
        </div>;
  
      var orderedChildren = (dir === DIRECTION.right && secondChild) ?
        [secondChild, firstChild] :
        [firstChild, secondChild];
  
      return (
        <div {...this.props}
          className={joinClasses(this.props.className, 'clearfix')}>
          {orderedChildren}
        </div>
      );
    }
  });

});