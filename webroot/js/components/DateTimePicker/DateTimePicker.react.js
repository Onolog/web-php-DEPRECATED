import jstz from 'jstz';
import {assign} from 'lodash';
import moment from 'moment-timezone';
import React, {PropTypes} from 'react';

import DateInput from './DateInput.react';
import TimeInput from './TimeInput.react';
import TimezoneSelector from 'components/Forms/TimezoneSelector.react';

// Make a best guess as to the user's current timezone.
const CURRENT_TIMEZONE = jstz.determine().name();
const TIMEZONES = moment.tz.names();

import './DateTimePicker.scss';

/**
 * DateTimePicker.react
 *
 * Form element that allows the user to select date, time and timezone.
 * Returns a date string with timezone offset and a timezone name.
 */
const DateTimePicker = React.createClass({
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
      PropTypes.string,
    ]),
    onChange: PropTypes.func.isRequired,
    /**
     * Timezone name (NOT the offset). For example: 'America/Los_Angeles'.
     */
    timezone: PropTypes.oneOf(TIMEZONES),
  },

  getDefaultProps() {
    return {
      date: new Date(),
      timezone: CURRENT_TIMEZONE,
    };
  },

  getInitialState() {
    var {date, timezone} = this.props;

    // Convert the date to individual values to keep them separate from the
    // timezone/offset.
    var dateObject = moment.tz(date, timezone).toObject();

    return {
      dateObject,
      timezone,
    };
  },

  render() {
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
        <div className="TimezoneSelector">
          <TimezoneSelector
            className="TimezoneSelector-select"
            onChange={this._onTimezoneChange}
            timezone={timezone}
          />
        </div>
      </div>
    );
  },

  _onChange(/*object*/ values) {
    var {dateObject, timezone} = this.state;
    dateObject = assign({}, dateObject, values);

    this.setState({dateObject});

    this.props.onChange(
      moment.tz(dateObject, timezone).format(),
      timezone
    );
  },

  _onTimezoneChange(/*string*/ timezone) {
    this.setState({timezone});

    this.props.onChange(
      moment.tz(this.state.dateObject, timezone).format(),
      timezone
    );
  },
});

export default DateTimePicker;
