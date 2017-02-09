import moment from 'moment-timezone';
import React, {PropTypes} from 'react';

const TIMEZONES = moment.tz.names();

/**
 * TimezoneSelector.react
 */
const TimezoneSelector = props => (
  <select
    {...props}
    onChange={e => props.onChange && props.onChange(e.target.value)}
    value={props.timezone}>
    {TIMEZONES.map((zone, idx) => (
      <option key={idx} value={zone}>
        {zone}
      </option>
    ))}
  </select>
);

TimezoneSelector.propTypes = {
  onChange: PropTypes.func,
  timezone: PropTypes.oneOf(TIMEZONES).isRequired,
};

export default TimezoneSelector;
