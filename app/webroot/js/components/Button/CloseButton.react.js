var React = require('react');

var TooltipMixin = require('../../mixins/TooltipMixin.react');

var cx = require('classnames');

/**
 * CloseButton.react
 * @jsx React.DOM
 */
var CloseButton = React.createClass({
  displayName: 'CloseButton',

  mixins: [TooltipMixin],

  render: function() {
    return (
      <button
        {...this.props}
        className={cx(this.props.className, 'close')}
        type="button">
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">Close</span>
      </button>
    );
  }
});

module.exports = CloseButton;
