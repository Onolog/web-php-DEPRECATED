var moment = require('moment');
var React = require('react');

var ConstrainedTextInput = require('./ConstrainedTextInput.react');
var HiddenInput = require('./HiddenInput.react');
var TextInput = require('./TextInput.react');

var cx = require('classnames');
var pad = require('utils/pad');
var {range} = require('lodash');

function formatter(value) {
  return pad(value, 2);
}

/**
 * DurationInput.react
 *
 * Input for specifying and displaying the duration of an activity, formatted
 * as `hh:mm:ss`.
 */
var DurationInput = React.createClass({
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
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      duration: this.props.duration
    };
  },

  render: function() {
    var duration = this.props.duration || 0;
    duration = moment.duration(duration, 's');

    return (
      <div className={cx('form-control', this.props.className)}>
        <ConstrainedTextInput
          defaultValue={this._getHoursValue(duration)}
          maxLength={2}
          onChange={this._onChange}
          placeholder="hh"
          ref="hours"
          values={range(0, 100)}
        />
        :
        <ConstrainedTextInput
          defaultValue={duration.minutes()}
          format={formatter}
          maxLength={2}
          onChange={this._onChange}
          placeholder="mm"
          ref="minutes"
          values={range(0, 60)}
        />
        :
        <ConstrainedTextInput
          defaultValue={duration.seconds()}
          format={formatter}
          maxLength={2}
          onChange={this._onChange}
          placeholder="ss"
          ref="seconds"
          values={range(0, 60)}
        />
        <HiddenInput
          name={this.props.name}
          value={this.state.duration}
        />
      </div>
    );
  },

  _onChange: function() {
    var duration = moment.duration({
      hours:   this.refs.hours.getValue(),
      minutes: this.refs.minutes.getValue(),
      seconds: this.refs.seconds.getValue()
    }).asSeconds();

    // Update state to set the hidden input.
    this.setState({ duration: duration });

    // Bubble a fake event to the parent component.
    this.props.onChange({
      target: {
        name: this.props.name,
        value: duration
      }
    });
  },

  _getHoursValue: function(/*object*/ duration) /*?number*/ {
    if (duration) {
      return duration.days() * 24 + duration.hours();
    }
  },
});

module.exports = DurationInput;
