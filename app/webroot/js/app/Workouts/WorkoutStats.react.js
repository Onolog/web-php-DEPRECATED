var React = require('react');

var LabeledStat = require('../../components/Data/LabeledStat.react');
var Topline = require('../../components/Data/Topline.react');

var calculatePace = require('../../utils/calculatePace');
var formatDistance = require('../../utils/formatDistance');
var secondsToTime = require('../../utils/secondsToTime');

/**
 * WorkoutStats.react
 * @jsx React.DOM
 *
 * Renders a series of label/stat pairings for the workout, like distance,
 * time, heart rate, etc.
 */
var WorkoutStats = React.createClass({
  displayName: 'WorkoutStats',

  propTypes: {
    workout: React.PropTypes.object.isRequired,
  },

  render: function() {
    var items = this._getStats().map(function(stat, idx) {
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
    var workout = this.props.workout;
    var stats = [{
      annotation: 'miles',
      label: 'Distance',
      value: formatDistance(workout.distance)
    }, {
      label: 'Time',
      value: secondsToTime(workout.time)
    }, {
      annotation: 'per mile',
      label: 'Pace',
      value: calculatePace.fromSeconds(
        workout.distance,
        workout.time // in seconds
      )
    }];

    if (workout.elevation) {
      stats.push({
        annotation: 'feet',
        label: 'Elevation Gain',
        value: workout.elevation
      });
    }

    if (workout.avg_hr) {
      stats.push({
        annotation: 'bpm',
        label: 'Avg. HR',
        value: Math.round(workout.avg_hr)
      });
    }

    if (workout.max_hr) {
      stats.push({
        annotation: 'bpm',
        label: 'Max. HR',
        value: Math.round(workout.max_hr)
      });
    }

    if (workout.calories) {
      stats.push({
        label: 'Calories',
        value: workout.calories
      });
    }

    return stats;
  }
});

module.exports = WorkoutStats;
