var React = require('react');
var cx = require('classnames');

/**
 * Textarea.react
 *
 * React wrapper around a standard textarea.
 */
var Textarea = React.createClass({
  displayName: 'Textarea',

  render: function() {
    return (
      <textarea
        {...this.props}
        className={cx(this.props.className, 'form-control')}
      />
    );
  },
});

module.exports = Textarea;
