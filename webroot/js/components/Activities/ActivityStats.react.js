import {map} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Distance from 'components/Distance/Distance.react';
import Topline from 'components/Topline/Topline.react';

import calculatePace from 'utils/calculatePace';
import secondsToTime from 'utils/secondsToTime';

/**
 * ActivityStats.react
 *
 * Renders a series of label/stat pairings for the activity, like distance,
 * time, heart rate, etc.
 */
class ActivityStats extends React.Component {
  static displayName = 'ActivityStats';

  static propTypes = {
    activity: PropTypes.object.isRequired,
  };

  render() {
    const items = map(this._getStats(), (stat, idx) => {
      return (
        <Topline.Item
          annotation={stat.annotation}
          key={idx}
          label={stat.label}>
          {stat.value}
        </Topline.Item>
      );
    });

    return <Topline>{items}</Topline>;
  }

  _getStats = () => {
    const {
      avg_hr,
      calories,
      distance,
      duration,
      elevation_gain,
      max_hr,
    } = this.props.activity;

    const stats = [{
      annotation: <Distance.Label />,
      label: 'Distance',
      value: <Distance distance={distance} label={false} />,
    }, {
      label: 'Duration',
      value: secondsToTime(duration),
    }, {
      annotation: <span>per <Distance.Label abbreviate /></span>,
      label: 'Pace',
      value: calculatePace(distance, duration),
    }];

    if (elevation_gain) {
      stats.push({
        annotation: 'feet',
        label: 'Elevation Gain',
        value: Math.round(elevation_gain),
      });
    }

    if (avg_hr) {
      stats.push({
        annotation: 'bpm',
        label: 'Avg. HR',
        value: Math.round(avg_hr),
      });
    }

    if (max_hr) {
      stats.push({
        annotation: 'bpm',
        label: 'Max. HR',
        value: Math.round(max_hr),
      });
    }

    if (calories) {
      stats.push({
        label: 'Calories',
        value: Math.round(calories),
      });
    }

    return stats;
  };
}

export default ActivityStats;
