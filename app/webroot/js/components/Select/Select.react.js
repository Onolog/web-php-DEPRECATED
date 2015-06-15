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
        defaultValue: 0,
        defaultLabel: ''
      };
    },

    getInitialState: function() {
      return {
        value: this.props.defaultValue
      };
    },

    render: function() {
      var options = this.props.options.map(function(option, idx) {
        // If we have a standard set of options, render a flat list
        if (!option.options || !Array.isArray(option.options)) {
          return this._renderOption(option, idx);
        }

        // Otherwise render <optgroup> with suboptions
        return (
          <optgroup key={'optgroup' + idx} label={option.label}>
            {option.options.map(this._renderOption)}
          </optgroup>
        );
      }.bind(this));

      // Add a default option if there's no pre-selected option. Note that
      // we're explicitly doing a null-check here, since `0` could be a valid
      // default value.
      if (this.props.defaultValue == null) {
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

    _renderOption: function(
      /*object*/ option,
      /*number*/ idx
    ) /*object*/ {
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
