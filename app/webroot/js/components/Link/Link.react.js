/**
 * Link.react
 * @jsx React.DOM
 *
 * React wrapper around standard HTML <a> tag
 */
define([

  'lib/react/react',
  'lib/react/jsx!mixins/TooltipMixin.react',

], function(React, TooltipMixin) {

  return React.createClass({
    displayName: 'Link',

    mixins: [TooltipMixin],

    render: function() {
      return <a {...this.props}>{this.props.children}</a>;
    }

  });

});
