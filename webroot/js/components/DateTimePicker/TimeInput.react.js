import {range} from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import ConstrainedTextInput from 'components/Forms/ConstrainedTextInput.react';

import pad from 'utils/pad';

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
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  },

  render() {
    var m = moment({
      hours: this.props.hours,
      minutes: this.props.minutes,
    });

    return (
      <div className="TimeInput">
        <div className="form-control">
          <ConstrainedTextInput
            format={formatter}
            maxLength={2}
            onChange={this._onHoursChange}
            value={m.format('hh')}
            values={range(1, 13)}
          />
          {':'}
          <ConstrainedTextInput
            format={formatter}
            maxLength={2}
            onChange={this._onMinutesChange}
            value={m.minutes()}
            values={range(0, 60)}
          />
          <ConstrainedTextInput
            className="meridiem"
            maxLength={2}
            onChange={this._onMeridiemChange}
            ref="meridiem"
            type="any"
            value={m.format('A')}
            values={Object.keys(MERIDIEM)}
          />
        </div>
      </div>
    );
  },

  _onHoursChange(/*number*/ hours) {
    var meridiem = this.refs.meridiem.getValue();

    // Display is 12-hour, time is 24-hour. Adjust accordingly.
    if (meridiem === MERIDIEM.PM && hours < 12) {
      hours = hours + 12;
    } else if (meridiem === MERIDIEM.AM && hours >= 12) {
      hours = hours - 12;
    }

    this._onChange(hours, this.props.minutes);
  },

  _onMinutesChange(/*number*/ minutes) {
    this._onChange(this.props.hours, minutes);
  },

  _onMeridiemChange(/*string*/ meridiem) {
    var {hours} = this.props;
    hours = (meridiem === MERIDIEM.PM && hours < 12) ? hours + 12 : hours - 12;
    this._onChange(hours, this.props.minutes);
  },

  _onChange(/*number*/ hours, /*number*/ minutes) {
    this.props.onChange({hours, minutes});
  },
});

module.exports = TimeInput;
