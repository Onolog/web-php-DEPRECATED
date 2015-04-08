/**
 * GarminFileUploadController.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Garmin/GarminDeviceInfo.react',
  'lib/react/jsx!app/Garmin/GarminMap.react',
  'lib/react/jsx!app/Garmin/GarminSplitsTable.react',
  'lib/react/jsx!app/Workouts/WorkoutStats.react',
  'lib/react/jsx!components/Data/DataGroup.react',
  'lib/react/jsx!components/Data/DataRow.react',

  'lib/garmin/activity/GpxActivityFactory',
  'lib/garmin/activity/TcxActivityFactory',
  'constants/Garmin',

  'utils/DateTimeUtils',
  'utils/distanceUtils',

  'lib/jquery/jquery.min'

], function(

  React,
  GarminDeviceInfo,
  GarminMap,
  GarminSplitsTable,
  WorkoutStats,
  DataGroup,
  DataRow,

  // Garmin
  GpxActivityFactory,
  TcxActivityFactory,
  GARMIN,
  DateTimeUtils,
  distanceUtils

) {

  var PLACEHOLDER = '--';

  return React.createClass({
    displayName: 'GarminFileUploadController',

    getInitialState: function() {
      return {
        activity: null
      };
    },

    render: function() {
      var activity = this.state.activity;
      return (
        <div>
          <DataGroup display="horizontal">
            <DataRow label="Choose a .tcx file">
              <input onChange={this._onChange} type="file" />
            </DataRow>
          </DataGroup>
          <hr />
          {this._renderWorkoutStats(activity)}
          <DataGroup display="horizontal">
            <DataRow label="Splits">
              <GarminSplitsTable activity={activity} />
              <GarminMap activity={activity} />
            </DataRow>
          </DataGroup>
          <hr />
          <GarminDeviceInfo activity={activity} />
          <hr />
          <DataGroup display="horizontal">
            <DataRow label="Activity Type">
              {(activity && activity.getActivityType()) || PLACEHOLDER}
            </DataRow>
            <DataRow label="Date">
              {this._renderDate(activity) || PLACEHOLDER}
            </DataRow>
          </DataGroup>
        </div>
      );
    },

    _renderWorkoutStats: function(activity) {
      if (activity) {
        return (
          <DataGroup display="horizontal">
            <DataRow label="">
              <WorkoutStats
                workout={this._getWorkoutFromGarminActivity(activity)}
              />
            </DataRow>
          </DataGroup>
        );
      }
    },

    /**
     * Converts a Garmin activity to a standard workout object that can be
     * displayed or saved.
     */
    _getWorkoutFromGarminActivity: function(activity) {
      return {
        distance: distanceUtils.metersToMiles(activity.getTotalDistance()),
        time: activity.getTotalTime(),
        avg_hr: activity.getAvgHeartRate(),
        max_hr: activity.getMaxHeartRate(),
        calories: activity.getCalories(),
        elevation: distanceUtils.metersToFeet(activity.getElevationGain())
      };
    },

    _renderDate: function(activity) {
      if (activity) {
        var startDateTime = activity.getStartTime().getDate();
        return startDateTime.toUTCString();
      }
    },

    _renderDistance: function(activity) {
      if (activity) {
        var distanceInMiles = distanceUtils.metersToMiles(
          activity.getTotalDistance()
        );
        return distanceInMiles + ' miles';
      }
    },

    _renderTotalTime: function(/*object*/ activity) /*string*/ {
      if (activity) {
        return DateTimeUtils.secondsToTime(activity.getTotalTime());
      }
    },

    _renderAvgHeartRate: function(activity) {
      if (activity) {
        return this._renderHR(activity.getAvgHeartRate());
      }
    },

    _renderMaxHeartRate: function(activity) {
      if (activity) {
        return this._renderHR(activity.getMaxHeartRate());
      }
    },

    _renderHR: function(heartRate) {
      return Math.round(heartRate) + ' bpm';
    },

    _renderElevationGain: function(activity) {
      if (activity) {
        return (
          distanceUtils.metersToFeet(activity.getElevationGain()) + ' feet'
        );
      }
    },

    _onChange: function(evt) {
      var files = evt.target.files;
      var reader = new FileReader();

      reader.onloadend = this._onLoadEnd;
      reader.readAsText(files[0]);
    },

    _onLoadEnd: function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        var file = evt.target.result;
        var activities = Garmin.TcxActivityFactory.parseString(file);

        // We currently only upload one file at a time
        this.setState({ activity: activities[0] });
      }
    }

  });

});
