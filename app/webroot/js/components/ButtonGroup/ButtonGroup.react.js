/**
 * ButtonGroup.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'utils/cx',
  'utils/joinClasses'

], function(React, cx, joinClasses) {

  var SIZE = {
    large: 'large',
    default: 'default',
    small: 'small',
    xsmall: 'xsmall'
  };

  var LAYOUT = {
    horizontal: 'horizontal',
    vertical: 'vertical'
  };

  return React.createClass({
    displayName: 'ButtonGroup',

    propTypes: {
      justified: React.PropTypes.bool,
      layout: React.PropTypes.oneOf(Object.keys(LAYOUT)),
      size: React.PropTypes.oneOf(Object.keys(SIZE))
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
      var className = joinClasses(cx({
        'btn-group': !isVerticalLayout,
        'btn-group-lg': size === SIZE.large,
        'btn-group-sm': size === SIZE.small,
        'btn-group-xs': size === SIZE.xsmall,
        'btn-group-justified': !!this.props.justified,
        'btn-group-vertical': isVerticalLayout,
      }), this.props.className);

      // TODO: Validate children to make sure they're buttons
      return (
        <div className={className} role="group">
          {this.props.children}
        </div>
      );
    }

  });

});
