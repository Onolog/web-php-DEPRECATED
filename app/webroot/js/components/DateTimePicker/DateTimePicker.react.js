var _ = require('underscore');
var jstz = require('jstz');
var moment = require('moment-timezone');
var React = require('react');
var {PropTypes} = React;

var DateInput = require('./DateInput.react');
var TimeInput = require('./TimeInput.react');
var TimezoneSelector = require('./TimezoneSelector.react');

// Make a best guess as to the user's current timezone.
// TODO: Allow users to set default timezones in Settings.
var CURRENT_TIMEZONE = jstz.determine().name();
var TIMEZONES = moment.tz.names();

require('./DateTimePicker.css');

/**
 * DateTimePicker.react
 * @jsx React.DOM
 *
 * Form element that allows the user to select date, time and timezone.
 * Returns a date string with timezone offset and a timezone name.
 */
var DateTimePicker = React.createClass({
  displayName: 'DateTimePicker',

  propTypes: {
    /**
     * Some kind of date format. Could be:
     *
     *  - A JS Date object
     *  - A timestamp
     *  - An object with key/value pairs corresponding to year/month/day, etc.
     *  - String representation of a date.
     */
    date: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string
    ]),
    onChange: PropTypes.func.isRequired,
    /**
     * Timezone name (NOT the offset). For example: 'America/Los_Angeles'.
     */
    timezone: PropTypes.oneOf(TIMEZONES)
  },

  getDefaultProps: function() {
    return {
      date: new Date(),
      timezone: CURRENT_TIMEZONE
    };
  },

  getInitialState: function() {
    return {
      /**
       * Convert the date to individual values to keep them separate from the
       * timezone/offset.
       */
      dateObject: moment(this.props.date).toObject(),
      timezone: this.props.timezone
    };
  },

  render: function() {
    var {dateObject, timezone} = this.state;

    return (
      <div className="DateTimePicker">
        <DateInput
          date={dateObject.date}
          months={dateObject.months}
          onChange={this._onChange}
          years={dateObject.years}
        />
        <TimeInput
          hours={dateObject.hours}
          minutes={dateObject.minutes}
          onChange={this._onChange}
        />
        <TimezoneSelector
          onChange={this._onTimezoneChange}
          timezone={timezone}
        />
      </div>
    );
  },

  _onChange: function(/*object*/ values) {
    var {dateObject, timezone} = this.state;
    dateObject = _.extend({}, dateObject, values);

    this.setState({dateObject: dateObject});

    this.props.onChange(
      moment.tz(dateObject, timezone).format(),
      timezone
    );
  },

  _onTimezoneChange: function(/*string*/ timezone) {
    this.setState({timezone: timezone});

    this.props.onChange(
      moment.tz(this.state.dateObject, timezone).format(),
      timezone
    );
  }
});

module.exports = DateTimePicker;
