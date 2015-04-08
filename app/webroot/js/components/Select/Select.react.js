/**
 * Select.react
 * @jsx React.DOM
 *
 * React wrapper around standard HTML <select> tag
 */
define(['lib/react/react'], function(React) {

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

      // Add a default label as the first option
      if (this.props.defaultLabel) {
        options.unshift(this._renderOption({
          label: this.props.defaultLabel,
          value: 0
        }, -1));
      }

      return (
        <select {...this.props} selected={this.props.defaultValue}>
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
    }
  });

});
