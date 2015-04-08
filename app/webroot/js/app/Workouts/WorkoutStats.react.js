/**
 * WorkoutStats.react
 * @jsx React.DOM
 *
 * Renders a series of label/stat pairings for the workout, like distance,
 * time, heart rate, etc.
 */

define([

  'lib/react/react',
  'lib/react/jsx!components/Data/LabeledStat.react',
  'lib/react/jsx!components/Data/Topline.react',
  'utils/calculatePace',
  'utils/DateTimeUtils',
  'utils/formatDistance'

], function(

  React,
  LabeledStat,
  Topline,
  calculatePace,
  DateTimeUtils,
  formatDistance

) {

  return React.createClass({
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
        value: DateTimeUtils.secondsToTime(workout.time)
      }, {
        annotation: 'per mile',
        label: 'Pace',
        value: calculatePace.fromSeconds(
          workout.distance,
          workout.time // in seconds
        )
      }];

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

      if (workout.elevation) {
        stats.push({
          annotation: 'feet',
          label: 'Elevation Gain',
          value: workout.elevation
        });
      }

      return stats;
    }
  });

});
