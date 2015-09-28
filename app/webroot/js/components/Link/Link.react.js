var React = require('react');
var TooltipMixin = require('../../mixins/TooltipMixin.react');

/**
 * Link.react
 * @jsx React.DOM
 *
 * React wrapper around standard HTML <a> tag
 */
var Link = React.createClass({
  displayName: 'Link',

  mixins: [TooltipMixin],

  render: function() {
    return <a {...this.props}>{this.props.children}</a>;
  }
});

module.exports = Link;
