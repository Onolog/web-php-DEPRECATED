/**
 * CloseButton.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!mixins/TooltipMixin.react'

], function(React, TooltipMixin) {

  return React.createClass({
    displayName: 'CloseButton',

    mixins: [TooltipMixin],

    render: function() {
      return (
        <button type="button" className="close" onClick={this.props.onClick}>
          <span aria-hidden="true">&times;</span>
          <span className="sr-only">Close</span>
        </button>
      );
    }
  });

});
