import moment from 'moment-timezone';
import React, {PropTypes} from 'react';

const TIMEZONES = moment.tz.names();

/**
 * TimezoneSelector.react
 */
const TimezoneSelector = ({timezone, ...otherProps}) => (
  <select
    {...otherProps}
    onChange={e => props.onChange && props.onChange(e.target.value)}
    value={timezone}>
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
