var React = require('react');

var LabeledStat = require('components/Data/LabeledStat.react');
var Topline = require('components/Data/Topline.react');

var calculatePace = require('utils/calculatePace');
var formatDistance = require('utils/formatDistance');
var {map} = require('lodash');
var secondsToTime = require('utils/secondsToTime');

/**
 * ActivityStats.react
 *
 * Renders a series of label/stat pairings for the activity, like distance,
 * time, heart rate, etc.
 */
var ActivityStats = React.createClass({
  displayName: 'ActivityStats',

  propTypes: {
    activity: React.PropTypes.object.isRequired,
  },

  render: function() {
    var items = map(this._getStats(), (stat, idx) => {
      return (
        <LabeledStat
          annotation={stat.annotation}
          key={idx}
          label={stat.label}
          stat={stat.value}
        />
      );
    });

    return <Topline>{items}</Topline>;
  },

  _getStats: function() {
    var {
      avg_hr,
      calories,
      distance,
      duration,
      elevation_gain,
      max_hr
    } = this.props.activity;

    var stats = [{
      annotation: 'miles',
      label: 'Distance',
      value: formatDistance(distance)
    }, {
      label: 'Time',
      value: secondsToTime(duration)
    }, {
      annotation: 'per mile',
      label: 'Pace',
      value: calculatePace.fromSeconds(distance, duration)
    }];

    if (elevation_gain) {
      stats.push({
        annotation: 'feet',
        label: 'Elevation Gain',
        value: Math.round(elevation_gain)
      });
    }

    if (avg_hr) {
      stats.push({
        annotation: 'bpm',
        label: 'Avg. HR',
        value: Math.round(avg_hr)
      });
    }

    if (max_hr) {
      stats.push({
        annotation: 'bpm',
        label: 'Max. HR',
        value: Math.round(max_hr)
      });
    }

    if (calories) {
      stats.push({
        label: 'Calories',
        value: calories
      });
    }

    return stats;
  }
});

module.exports = ActivityStats;
