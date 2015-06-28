/**
 * Select.react
 * @jsx React.DOM
 *
 * React wrapper around standard HTML <select> tag
 */
define([

  'lib/react/react',
  'utils/joinClasses'

], function(

  React,
  joinClasses

) {

  return React.createClass({
    displayName: 'Select',

    propTypes: {
      options: React.PropTypes.array.isRequired,
      defaultValue: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]),
      /**
       * Option to be used if there's no defaultValue
       */
      defaultLabel: React.PropTypes.string
    },

    getDefaultProps: function() {
      return {
        defaultLabel: ''
      };
    },

    getInitialState: function() {
      return {
        value: this.props.defaultValue
      };
    },

    render: function() {
      var options = this.props.options.map(this._renderOptions);

      if (this.props.defaultLabel) {
        options.unshift(this._renderOption({
          label: this.props.defaultLabel,
          value: -1
        }, -1));
      }

      return (
        <select
          {...this.props}
          className={joinClasses('form-control', this.props.className)}
          onChange={this._onChange}
          value={this.state.value}>
          {options}
        </select>
      );
    },

    _renderOptions: function(/*object*/ option, /*number*/ idx) /*object*/ {
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

    _renderOption: function(/*object*/ option, /*number*/ idx) /*object*/ {
      return (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      );
    },

    _onChange: function(/*object*/ evt) {
      this.setState({value: evt.target.value});
      this.props.onChange && this.props.onChange(evt);
    }

  });

});
