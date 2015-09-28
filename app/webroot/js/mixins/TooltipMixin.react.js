var $ = require('jquery');
var Bootstrap = require('../lib/bootstrap.min');
var React = require('react');

/**
 * TooltipMixin.react
 * @jsx React.DOM
 *
 * Adds tooltip functionality that can be used in any component.
 */
var TooltipMixin = {
  componentDidMount: function() {
    var tooltip = this.props.tooltip;
    if (!tooltip || !tooltip.title) {
      return;
    }

    // Use body as the tooltip container to avoid strange behaviors.
    tooltip.container = 'body';

    this.node = $(this.getDOMNode());
    this.node.tooltip(tooltip);
  },

  componentWillUnmount: function() {
    // Be sure to destroy the tooltip when unmounting the component.
    this.node && this.node.tooltip('destroy');
  }
};

module.exports = TooltipMixin;
