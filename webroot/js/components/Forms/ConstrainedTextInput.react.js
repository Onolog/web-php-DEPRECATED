import cx from 'classnames';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

const {DOWN, UP} = require('constants/KeyCode');
const TYPES = {
  any: 'any',
  number: 'number',
};

/**
 * ConstrainedTextInput.react
 *
 * A text input with a predefined set of valid values. User can cycle through
 * the values by pressing the up and down arrow keys. They can also enter a
 * specific value, which will be validated on blur.
 */
class ConstrainedTextInput extends React.Component {
  static displayName = 'ConstrainedTextInput';

  static propTypes = {
    /**
     * Allows custom formatting of number values for display. For example:
     *
     *    1 => '01'
     */
    format: PropTypes.func,
    /**
     * Defines the type of values found in `this.props.values`.
     *
     *    Any: Values can be of any type, or a mix of types. Validation is
     *    strict here since values aren't cast.
     *
     *    Number: Values can be numbers, or number-like strings cast to
     *    numbers for validation. Validation is a bit looser in this case.
     */
    type: PropTypes.oneOf(Object.keys(TYPES)),
    /**
     * An array of valid values for the input. This automatically restricts
     * and validates what can be entered as a value.
     */
    values: PropTypes.array.isRequired,
  };

  static defaultProps = {
    type: TYPES.number,
  };

  constructor(props, context) {
    super(props, context);
    const {defaultValue, value, values} = props;
    const index = this._getIndex(defaultValue || value);

    invariant(
      index !== -1,
      'ConstrainedInput: `' + (defaultValue || value) + '` must be in `' +
      values + '`'
    );

    this.state = {
      index: index,
      /**
       * Keep track of the last valid index that was registered, as a
       * fallback in case the user enters an invalid value.
       */
      lastValidIndex: index,
      /**
       * Temporarily store a value when the user is manually entering it and
       * validate on blur.
       */
      tempValue: null,
    };
  }

  render() {
    var value = this.state.tempValue;
    if (value == null) {
      value = this.props.values[this.state.index];
      if (this.props.type === TYPES.number && this.props.format) {
        value = this.props.format(value);
      }
    }

    return (
      <input
        {...this.props}
        className={cx('constrainedTextInput', this.props.className)}
        onBlur={this._onBlur}
        onChange={this._onKeyboardEntry}
        onKeyDown={this._onKeydown}
        size={this.props.maxLength}
        type="text"
        value={value}
      />
    );
  }

  getValue = () => {
    return findDOMNode(this).value;
  };

  _getIndex = value => {
    // Explicitly check for empty string in case the user cleared the input.
    if (value !== '' && this.props.type === TYPES.number) {
      // If the values are numbers, cast the value to a number to check it.
      value = +value;
    }
    return this.props.values.indexOf(value);
  };

  _onKeydown = e => {
    const count = this.props.values.length;
    let index = +this.state.index;

    switch (e.keyCode) {
      case UP:
        index++;
        index = index < count ? index : 0;
        break;
      case DOWN:
        index--;
        index = index >= 0 ? index : count - 1;
        break;
      default:
        // Everything besides up and down is a no-op for now.
        // TODO: Blur and reset the value when a user hits escape?
        // Might be a nice way for the user to undo any changes.
        return;
    }

    this._onChange(index);
  };

  _onBlur = evt => {
    var tempValue = this.state.tempValue;
    if (tempValue == null) {
      return;
    }

    // Validate the stored value against the allowed values.
    var index = this._getIndex(tempValue);
    if (index === -1) {
      index = this.state.lastValidIndex;
    }

    // When the input is blurred, "commit" the changes by updating the index
    // and re-setting the temp value.
    this._onChange(index);
  };

  /**
   * When typing in a value, store it as a temp value until the blur event.
   */
  _onKeyboardEntry = e => {
    this.setState({tempValue: e.target.value});
  };

  _onChange = index => {
    this.setState({
      index,
      lastValidIndex: index,
      tempValue: null,
    });

    this.props.onChange && this.props.onChange(this.props.values[index]);
  };
}

module.exports = ConstrainedTextInput;
