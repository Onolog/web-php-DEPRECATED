var React = require('react');
var cx = require('classnames');

/**
 * TextInput.react
 * @jsx React.DOM
 *
 * React wrapper around a standard text input.
 */
var TextInput = React.createClass({
  displayName: 'TextInput',

  render: function() {
    return (
      <input
        {...this.props}
        className={cx(this.props.className, 'form-control')}
        type="text"
      />
    );
  },

  blur: function() {
    this.getDOMNode().blur();
    return this;
  },

  focus: function() {
    this.getDOMNode().focus();
    return this;
  },

  getValue: function() {
    return this.getDOMNode().value;
  }
});

module.exports = TextInput;
