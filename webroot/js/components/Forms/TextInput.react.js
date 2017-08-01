var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');

/**
 * TextInput.react
 *
 * React wrapper around a standard text input.
 */
class TextInput extends React.Component {
  static displayName = 'TextInput';

  render() {
    return (
      <input
        {...this.props}
        className={cx(this.props.className, 'form-control')}
        type="text"
      />
    );
  }

  blur = () => {
    ReactDOM.findDOMNode(this).blur();
    return this;
  };

  focus = () => {
    ReactDOM.findDOMNode(this).focus();
    return this;
  };

  getValue = () => {
    return ReactDOM.findDOMNode(this).value;
  };
}

module.exports = TextInput;
