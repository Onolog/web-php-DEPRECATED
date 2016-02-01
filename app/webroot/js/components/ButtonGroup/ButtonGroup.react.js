var React = require('react');

var cx = require('classnames');
var {values} = require('lodash');

var {SIZE} = require('constants/Bootstrap');
var LAYOUT = {
  horizontal: 'horizontal',
  vertical: 'vertical'
};

/**
 * ButtonGroup.react
 */
var ButtonGroup = React.createClass({
  displayName: 'ButtonGroup',

  propTypes: {
    justified: React.PropTypes.bool,
    layout: React.PropTypes.oneOf(Object.keys(LAYOUT)),
    size: React.PropTypes.oneOf(values(SIZE)),
  },

  getDefaultProps: function() {
    return {
      justified: false,
      layout: 'horizontal',
      size: SIZE.default,
    };
  },

  render: function() {
    var size = this.props.size;
    var isVerticalLayout = this.props.layout === LAYOUT.vertical;
    var className = cx({
      'btn-group': !isVerticalLayout,
      'btn-group-lg': size === SIZE.LARGE,
      'btn-group-sm': size === SIZE.SMALL,
      'btn-group-xs': size === SIZE.XSMALL,
      'btn-group-justified': !!this.props.justified,
      'btn-group-vertical': isVerticalLayout,
    }, this.props.className);

    // TODO: Validate children to make sure they're buttons
    return (
      <div className={className} role="group">
        {this.props.children}
      </div>
    );
  }

});

module.exports = ButtonGroup;
