var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');

/**
 * TextInput.react
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
    ReactDOM.findDOMNode(this).blur();
    return this;
  },

  focus: function() {
    ReactDOM.findDOMNode(this).focus();
    return this;
  },

  getValue: function() {
    return ReactDOM.findDOMNode(this).value;
  },
});

module.exports = TextInput;
