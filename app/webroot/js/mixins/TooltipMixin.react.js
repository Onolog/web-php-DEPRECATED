var React = require('react');

var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Tooltip = require('react-bootstrap/lib/Tooltip');

/**
 * TooltipMixin.react
 *
 * Adds tooltip functionality that can be used in any component.
 */
var TooltipMixin = {
  addTooltip: function(component) {
    var {tooltip} = this.props;
    if (tooltip && tooltip.title) {
      component =
        <OverlayTrigger
          overlay={
            <Tooltip id={tooltip.title.split().join('-')}>
              {tooltip.title}
            </Tooltip>
          }
          placement={tooltip.placement || 'top'}>
          {component}
        </OverlayTrigger>;
    }
    return component;
  }
};

module.exports = TooltipMixin;
