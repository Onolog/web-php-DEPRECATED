/**
 * TooltipMixin.react
 * @jsx React.DOM
 *
 * Adds tooltip functionality that can be used in any component.
 */
define([

  'lib/react/react',
  'lib/bootstrap.min'

], function(React) {

  return {
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

});
