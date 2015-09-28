var React = require('react');

var AppPage = require('../../components/Page/AppPage.react');
var Activity = require('../Activities/Activity.react');
var EmptyState = require('../../components/EmptyState.react');
var FileInput = require('../../components/Forms/FileInput.react');
var PageHeader = require('../../components/Page/PageHeader.react');
var Panel = require('../../components/Panel/Panel.react');
var TcxActivityFactory = require('../../lib/garmin/activity/TcxActivityFactory');

var distanceUtils = require('../../utils/distanceUtils');

/**
 * GarminUploader.react
 * @jsx React.DOM
 */
var GarminUploader = React.createClass({
  displayName: 'GarminUploader',

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
      <AppPage className="narrow-page">
        <PageHeader title="" />
        <Panel title="Choose a .tcx file">
          <FileInput onChange={this._onChange} />
        </Panel>
        <Panel noPadding={!!activity}>
          {contents}
        </Panel>
      </AppPage>
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

module.exports = GarminUploader;
