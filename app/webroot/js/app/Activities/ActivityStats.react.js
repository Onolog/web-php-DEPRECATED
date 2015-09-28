var React = require('react');

var LabeledStat = require('../../components/Data/LabeledStat.react');
var Topline = require('../../components/Data/Topline.react');

var calculatePace = require('../../utils/calculatePace');
var DateTimeUtils = require('../../utils/DateTimeUtils');
var formatDistance = require('../../utils/formatDistance');

/**
 * ActivityStats.react
 * @jsx React.DOM
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
    var activity = this.props.activity;
    var stats = [{
      annotation: 'miles',
      label: 'Distance',
      value: formatDistance(activity.distance)
    }, {
      label: 'Time',
      value: DateTimeUtils.secondsToTime(activity.time)
    }, {
      annotation: 'per mile',
      label: 'Pace',
      value: calculatePace.fromSeconds(
        activity.distance,
        activity.time // in seconds
      )
    }];

    if (activity.elevation) {
      stats.push({
        annotation: 'feet',
        label: 'Elevation Gain',
        value: activity.elevation
      });
    }

    if (activity.avg_hr) {
      stats.push({
        annotation: 'bpm',
        label: 'Avg. HR',
        value: Math.round(activity.avg_hr)
      });
    }

    if (activity.max_hr) {
      stats.push({
        annotation: 'bpm',
        label: 'Max. HR',
        value: Math.round(activity.max_hr)
      });
    }

    if (activity.calories) {
      stats.push({
        label: 'Calories',
        value: activity.calories
      });
    }

    return stats;
  }
});

module.exports = ActivityStats;
