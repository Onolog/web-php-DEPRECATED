/**
 * GarminFileUploadController.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Activities/Activity.react',
  'lib/react/jsx!components/EmptyState.react',
  'lib/react/jsx!components/Forms/FileInput.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'lib/garmin/activity/TcxActivityFactory',
  'utils/distanceUtils'

], function(

  React,
  Activity,
  EmptyState,
  FileInput,
  Panel,
  TcxActivityFactory,
  distanceUtils

) {

  return React.createClass({
    displayName: 'GarminFileUploadController',

    getInitialState: function() {
      return {
        activity: null
      };
    },

    render: function() {
      var activity = this.state.activity;
      var contents;

      if (activity) {
        contents = <Activity activity={this._normalizeActivity(activity)} />;
      } else {
        contents =
          <EmptyState
            message="No activity to display. Please upload a file."
          />;
      }

      return (
        <div>
          <Panel title="Choose a .tcx file">
            <FileInput onChange={this._onChange} />
          </Panel>
          <Panel noPadding={!!activity}>
            {contents}
          </Panel>
        </div>
      );
    },

    /**
     * Convert a Garmin activity to the standardized format.
     */
    _normalizeActivity: function(activity) {;
      var friends = [4280, 700963, 509191417].join(',');

      var notes =
        'Long run in Wunderlich Park with Sonderby, Turner, and Laney. ' +
        'Felt pretty good, probably pushed a bit too hard. HR was over ' +
        '153 most of the time. Felt a little beat up by the end, but ' +
        'overall pretty good recovery long run after Way Too Cool.' +
        '\n\n' +
        'http://connect.garmin.com/modern/activity/719673604';

      return {
        activity_type: activity.getActivityType(), // TODO: convert to IDs?
        athlete: {
          id: 517820043,
          name: 'Eric Giovanola'
        },
        calories: activity.getCalories(),
        date: activity.getStartTime().getDate().getTime() / 1000,
        device: {
          name: activity.getDeviceName(),
          version: activity.getSoftwareVersionString()
        },
        distance: distanceUtils.metersToMiles(activity.getTotalDistance()),
        elevation: distanceUtils.metersToFeet(activity.getElevationGain()),
        friends: friends,
        id: 0,
        notes: notes,
        series: activity.getSeries(),
        shoes: {
          id: 41,
          name: 'ASICS DS Trainer 19.2'
        },
        laps: activity.getLaps(),
        time: activity.getTotalTime(),
        avg_hr: activity.getAvgHeartRate(),
        max_hr: activity.getMaxHeartRate()
      };
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
        var activities = TcxActivityFactory.parseString(file);

        // We currently only upload one file at a time
        this.setState({activity: activities[0]});
      }
    }

  });

});
