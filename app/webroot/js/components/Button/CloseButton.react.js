var React = require('react');

var TooltipMixin = require('mixins/TooltipMixin.react');

var cx = require('classnames');

/**
 * CloseButton.react
 */
var CloseButton = React.createClass({
  displayName: 'CloseButton',

  mixins: [TooltipMixin],

  render: function() {
    return this.addTooltip(
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
