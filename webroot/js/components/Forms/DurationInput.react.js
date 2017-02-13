import cx from 'classnames';
import {range} from 'lodash';
import moment from 'moment';
import React from 'react';

import ConstrainedTextInput from './ConstrainedTextInput.react';
import HiddenInput from './HiddenInput.react';

import pad from 'utils/pad';

function formatter(value) {
  return pad(value, 2);
}

/**
 * DurationInput.react
 *
 * Input for specifying and displaying the duration of an activity, formatted
 * as `hh:mm:ss`.
 */
const DurationInput = React.createClass({
  displayName: 'DurationInput',

  propTypes: {
    /**
     * The duration of the workout, in seconds.
     */
    duration: React.PropTypes.number,
    /**
     * Name of the form that is using the component.
     */
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      duration: 0,
    };
  },

  getInitialState() {
    return {
      duration: this.props.duration,
    };
  },

  render() {
    const duration = moment.duration(this.props.duration, 's');

    return (
      <div className={cx('form-control', this.props.className)}>
        <ConstrainedTextInput
          maxLength={2}
          onChange={this._onChange}
          placeholder="hh"
          ref="hours"
          value={this._getHoursValue(duration)}
          values={range(0, 100)}
        />
        :
        <ConstrainedTextInput
          format={formatter}
          maxLength={2}
          onChange={this._onChange}
          placeholder="mm"
          ref="minutes"
          value={duration.minutes()}
          values={range(0, 60)}
        />
        :
        <ConstrainedTextInput
          format={formatter}
          maxLength={2}
          onChange={this._onChange}
          placeholder="ss"
          ref="seconds"
          value={duration.seconds()}
          values={range(0, 60)}
        />
        <HiddenInput
          name={this.props.name}
          value={this.state.duration}
        />
      </div>
    );
  },

  _onChange() {
    var duration = moment.duration({
      hours: this.refs.hours.getValue(),
      minutes: this.refs.minutes.getValue(),
      seconds: this.refs.seconds.getValue(),
    }).asSeconds();

    // Update state to set the hidden input.
    this.setState({duration});

    // Bubble a fake event to the parent component.
    this.props.onChange({
      target: {
        name: this.props.name,
        value: duration,
      },
    });
  },

  _getHoursValue(/*object*/ duration) /*?number*/ {
    if (duration) {
      return duration.days() * 24 + duration.hours();
    }
  },
});

module.exports = DurationInput;
