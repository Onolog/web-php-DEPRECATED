var {map} = require('lodash');
const PropTypes = require('prop-types');
var React = require('react');

var Topline = require('components/Topline/Topline.react');

var calculatePace = require('utils/calculatePace');
var formatDistance = require('utils/formatDistance');
var secondsToTime = require('utils/secondsToTime');

/**
 * ActivityStats.react
 *
 * Renders a series of label/stat pairings for the activity, like distance,
 * time, heart rate, etc.
 */
const ActivityStats = React.createClass({
  displayName: 'ActivityStats',

  propTypes: {
    activity: PropTypes.object.isRequired,
  },

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
  },

  _getStats() {
    const {
      avg_hr,
      calories,
      distance,
      duration,
      elevation_gain,
      max_hr,
    } = this.props.activity;

    const stats = [{
      annotation: 'miles',
      label: 'Distance',
      value: formatDistance(distance),
    }, {
      label: 'Duration',
      value: secondsToTime(duration),
    }, {
      annotation: 'per mile',
      label: 'Pace',
      value: calculatePace.fromSeconds(distance, duration),
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
  },
});

module.exports = ActivityStats;
