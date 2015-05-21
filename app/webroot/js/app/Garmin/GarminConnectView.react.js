/**
 * GarminConnectView.react
 * @jsx React.DOM
 *
 * Main UI component for 
 */
define([

  'lib/react/react',

  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Data/DataGroup.react',
  'lib/react/jsx!components/Data/DataRow.react',

  'lib/react/jsx!app/Garmin/GarminDeviceInfo.react',
  'lib/react/jsx!app/Garmin/GarminActivityList.react',
  'lib/react/jsx!app/Garmin/GarminSingleWorkoutView.react',

  'utils/cx'

], function(

    React,

    Button,
    DataGroup,
    DataRow,

    GarminDeviceInfo,
    GarminActivityList,
    GarminSingleWorkoutView,

    cx

) {

  return React.createClass({
    displayName: 'GarminConnectView',

    propTypes: {
      activities: React.PropTypes.array,
      device: React.PropTypes.object,
      onSelectedActivitiesChange: React.PropTypes.func.isRequired,
      readSelectedActivities: React.PropTypes.func.isRequired,
      selectedActivity: React.PropTypes.string,
      selectedActivities: React.PropTypes.array,
      status: React.PropTypes.string,
    },

    render: function() {
      return (
        <div>
        	<div id="pluginObject"></div>

          <section id="statusBox">
          	<div
              className={cx({
                'alert': true,
                'alert-info': true,
                'hidden': !this.props.status
              })}>
              <div id="statusLoader" className="loader-sm"></div>
              <span id="statusContainer">
                {this.props.status}
              </span>
            </div>
      
          	<div id="progressBar" className="progress" style={{ display: 'none' }}>
              <div 
                id="progressBarDisplay" 
                className="progress-bar progress-bar-success" 
                role="progressbar" 
                aria-valuemin="0" 
                aria-valuemax="100">
                <span className="sr-only">40% Complete (success)</span>
              </div>
          	</div>
          </section>

          <GarminDeviceInfo device={this.props.device} />

          <hr/>
      
          <DataGroup display="horizontal">
            <DataRow label="Activity List">
              <GarminActivityList
                activities={this.props.activities}
                selectedActivities={this.props.selectedActivities}
                onChange={this.props.onSelectedActivitiesChange}
              />
            </DataRow>
            <DataRow label="">
              <Button
                label="Read Selected from Device"
                use="primary"
                disabled={!this.props.activities.length}
                onClick={this.props.readSelectedActivities}>
              </Button>
            </DataRow>
          </DataGroup>

          <hr/>

          <GarminSingleWorkoutView
            activity={this._getSelectedActivity()}
          />

        </div>
      );
    },

    _getSelectedActivity: function() {
      var activities = this.props.activities;
      var selectedActivity = this.props.selectedActivity;
      var selected = {};

      if (!activities.length || !selectedActivity) {
        return selected;
      }

      activities.forEach(function(activity) {
        if (activity.getAttribute('activityName') === selectedActivity) {
          selected = activity;
        }
      }.bind(this));

      return selected;
    }

  });

});
