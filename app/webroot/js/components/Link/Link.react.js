var React = require('react');
var TooltipMixin = require('mixins/TooltipMixin.react');

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
    return this.addTooltip(
      <a {...this.props} onClick={this._onClick}>
        {this.props.children}
      </a>
    );
  },

  _onClick: function(e) {
    if (this.props.href === '#') {
      e.preventDefault();
    }
    this.props.onClick && this.props.onClick(e);
  }
});

module.exports = Link;
