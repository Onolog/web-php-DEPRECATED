var moment = require('moment');
var {Panel} = require('react-bootstrap');
var React = require('react');

var Activity = require('app/Activities/Activity.react');
var AppPage = require('components/Page/AppPage.react');
var EmptyState = require('components/EmptyState.react');
var FileInput = require('components/Forms/FileInput.react');
var PageHeader = require('components/Page/PageHeader.react');

var {head} = require('lodash');
var {metersToFeet, metersToMiles} = require('utils/distanceUtils');
var FileParser = require('utils/parsers/FileParser');
var GoogleTimezone = require('utils/GoogleTimezone');

/**
 * GarminUploader.react
 */
var GarminUploader = React.createClass({
  displayName: 'GarminUploader',

  getInitialState: function() {
    return {
      activity: null,
    };
  },

  render: function() {
    const {activity} = this.state;
    let contents = activity ?
      <Activity
        activity={this._normalizeActivity(activity)}
        fill
      /> :
      <EmptyState>
        No activity to display. Please upload a file.
      </EmptyState>;

    return (
      <AppPage className="narrow-page">
        <PageHeader title="" />
        <Panel header={<h3>Choose a .tcx file</h3>}>
          <FileInput onChange={this._onChange} />
        </Panel>
        <Panel>
          {contents}
        </Panel>
      </AppPage>
    );
  },

  /**
   * Convert a Garmin activity to the standardized format.
   */
  _normalizeActivity: function(activity) {
    var friends = [
      4280,
      700963,
      509191417,
    ].join(',');

    var notes =
      'Long run in Wunderlich Park with Sonderby, Turner, and Laney. ' +
      'Felt pretty good, probably pushed a bit too hard. HR was over ' +
      '153 most of the time. Felt a little beat up by the end, but ' +
      'overall pretty good recovery long run after Way Too Cool.' +
      '\n\n' +
      'http://connect.garmin.com/modern/activity/719673604';

    var m = moment(activity.start_date);

    return Object.assign({}, activity, {
      // General activity data
      id: 0,
      date: m.unix(),
      start_date: m.format(),

      // Athlete-specific data
      distance: metersToMiles(activity.distance),
      time: activity.duration,
      elevation_gain: metersToFeet(activity.elevation_gain),
      elevation_loss: metersToFeet(activity.elevation_loss),
      friends: friends,
      notes: notes,

      // From foreign keys
      athlete: {
        id: 517820043,
        name: 'Eric Giovanola',
      },
      shoes: {
        id: 41,
        name: 'ASICS DS Trainer 19.2',
      },
    });
  },

  _onChange: function(evt) {
    var files = evt.target.files;
    var reader = new FileReader();

    reader.onloadend = this._onLoadEnd;
    reader.readAsText(files[0]);
  },

  _onLoadEnd: function(evt) {
    if (evt.target.readyState === FileReader.DONE) {
      var parser = new FileParser();
      var activities = parser.parse(evt.target.result);

      // We currently only upload one file at a time
      var activity = head(activities);
      var start = activity.tracks[0][0];

      // Get the timezone from the activity's geodata.
      GoogleTimezone({
        latitude: start.latitude,
        longitude: start.longitude,
        timestamp: moment(start.time).unix(),
      }, (response) => {
        activity.timezone = response.timeZoneId;
        this.setState({activity: activity});
      });
    }
  },
});

module.exports = GarminUploader;
