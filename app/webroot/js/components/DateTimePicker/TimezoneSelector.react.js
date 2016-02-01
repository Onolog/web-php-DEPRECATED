var jstz = require('jstz');
var moment = require('moment-timezone');
var React = require('react');

var TIMEZONES = moment.tz.names();

/**
 * TimezonePicker
 */
var TimezonePicker = React.createClass({
  displayName: 'TimezonePicker',

  propTypes: {
    timezone: React.PropTypes.oneOf(TIMEZONES).isRequired,
    onChange: React.PropTypes.func
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
  }
});

module.exports = TimezonePicker;
