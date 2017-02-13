import React, {PropTypes} from 'react';
import cx from 'classnames';

/**
 * Select.react
 *
 * React wrapper around standard HTML <select> tag
 */
const Select = React.createClass({
  displayName: 'Select',

  propTypes: {
    options: React.PropTypes.array.isRequired,
    /**
     * Option to be used if there's no defaultValue
     */
    defaultLabel: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      defaultLabel: '',
    };
  },

  render() {
    const {className, defaultLabel, options, ...otherProps} = this.props;

    let selectOptions = options.map(this._renderOptions);
    if (defaultLabel) {
      selectOptions.unshift(this._renderOption({
        label: defaultLabel,
        value: -1,
      }, -1));
    }

    return (
      <select
        {...otherProps}
        className={cx('form-control', className)}
        onChange={this._onChange}>
        {selectOptions}
      </select>
    );
  },

  _renderOptions(/*object*/ option, /*number*/ idx) /*object*/ {
    // If the option contains sub-options, render an <optgroup>
    if (option.options && Array.isArray(option.options)) {
      return (
        <optgroup key={'optgroup' + idx} label={option.label}>
          {option.options.map(this._renderOption)}
        </optgroup>
      );
    }

    // Otherwise, just render normal options
    return this._renderOption(option, idx);
  },

  _renderOption(/*object*/ option, /*number*/ idx) /*object*/ {
    return (
      <option key={idx} value={option.value}>
        {option.label}
      </option>
    );
  },

  _onChange(/*object*/ e) {
    // this.setState({value: e.target.value});
    this.props.onChange && this.props.onChange(e);
  },
});

export default Select;
