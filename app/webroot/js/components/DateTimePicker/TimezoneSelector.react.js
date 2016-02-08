import moment from 'moment-timezone';
import React from 'react';

const TIMEZONES = moment.tz.names();

/**
 * TimezonePicker
 */
const TimezonePicker = React.createClass({
  displayName: 'TimezonePicker',

  propTypes: {
    timezone: React.PropTypes.oneOf(TIMEZONES).isRequired,
    onChange: React.PropTypes.func,
  },

  render: function() {
    return (
      <div className="TimezoneSelector">
        <select
          className="TimezoneSelector-select"
          onChange={this._onChange}
          value={this.props.timezone}>
          {TIMEZONES.map(this._renderTimezoneOption)}
        </select>
      </div>
    );
  },

  _renderTimezoneOption: function(zone, idx) {
    return (
      <option key={idx} value={zone}>
        {zone}
      </option>
    );
  },

  _onChange: function(e) {
    this.props.onChange && this.props.onChange(e.target.value);
  },
});

module.exports = TimezonePicker;
