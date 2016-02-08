var moment = require('moment');
var React = require('react');

var ConstrainedTextInput = require('components/Forms/ConstrainedTextInput.react');

var pad = require('utils/pad');
var {range} = require('lodash');

const MERIDIEM = {
  AM: 'AM',
  PM: 'PM',
};

function formatter(value) {
  return pad(value, 2);
}

/**
 * TimeInput.react.js
 *
 * Structured input for specifiying a time of day. Can be used as a controlled
 * or uncontrolled input similar to a normal form field.
 */
var TimeInput = React.createClass({
  displayName: 'TimeInput',

  propTypes: {
    hours: React.PropTypes.number.isRequired,
    minutes: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  render: function() {
    var m = moment({
      hours: this.props.hours,
      minutes: this.props.minutes,
    });

    return (
      <div className="TimeInput">
        <div className="form-control">
          <ConstrainedTextInput
            defaultValue={m.format('hh')}
            format={formatter}
            maxLength={2}
            onChange={this._onHoursChange}
            values={range(1, 13)}
          />
          {':'}
          <ConstrainedTextInput
            defaultValue={m.minutes()}
            format={formatter}
            maxLength={2}
            onChange={this._onMinutesChange}
            values={range(0, 60)}
          />
          <ConstrainedTextInput
            className="meridiem"
            defaultValue={m.format('A')}
            maxLength={2}
            onChange={this._onMeridiemChange}
            ref="meridiem"
            type="any"
            values={Object.keys(MERIDIEM)}
          />
        </div>
      </div>
    );
  },

  _onHoursChange: function(/*number*/ hours) {
    var meridiem = this.refs.meridiem.getValue();

    // Display is 12-hour, time is 24-hour. Adjust accordingly.
    if (meridiem === MERIDIEM.PM && hours < 12) {
      hours = hours + 12;
    } else if (meridiem === MERIDIEM.AM && hours >= 12) {
      hours = hours - 12;
    }

    this._onChange(hours, this.props.minutes);
  },

  _onMinutesChange: function(/*number*/ minutes) {
    this._onChange(this.props.hours, minutes);
  },

  _onMeridiemChange: function(/*string*/ meridiem) {
    var {hours} = this.props;
    hours = (meridiem === MERIDIEM.PM && hours < 12) ? hours + 12 : hours - 12;
    this._onChange(hours, this.props.minutes);
  },

  _onChange: function(/*number*/ hours, /*number*/ minutes) {
    this.props.onChange({hours, minutes});
  },
});

module.exports = TimeInput;
