/**
 * GarminConnectController.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'constants/Garmin',
  'constants/Onolog',
  'lib/react/jsx!app/Garmin/GarminConnectView.react',
  'lib/garmin/device/GarminDeviceControl',
  'lib/garmin/activity/GpxActivityFactory',
  'lib/garmin/activity/TcxActivityFactory'

], function(

  React,
  GARMIN,
  ONOLOG,
  GarminConnectView

) {

  // Supported file types. Only deal with TCX for now.
  var TCX_DIR = Garmin.DeviceControl.FILE_TYPES.tcxDir;
  var TCX_DETAIL = Garmin.DeviceControl.FILE_TYPES.tcxDetail;

  return React.createClass({

    getInitialState: function() {
      return {
        // All activities read from the device
        activities: [],
        // Device information
        device: {},
        // Specifies the fileType to use when reading data from the device.
        // Initially read the directory, then use detail to read selected
        // activities.
        fileType: TCX_DIR,
        // The single selected activity for which to show detail
        selectedActivity: '',
        // Array of all the selected activities for download
        selectedActivities: [],
        status: '',
      }
    },

    componentDidMount: function() {
      this.initController();
    },

    render: function() {
      return (
        <GarminConnectView
          activities={this.state.activities}
          device={this.state.device}
          onSelectedActivitiesChange={this._handleSelectedActivities}
          readSelectedActivities={this._readSelectedActivities}
          selectedActivity={this.state.selectedActivity}
          selectedActivities={this.state.selectedActivities}
          status={this.state.status}
        />
      );
    },

    /**
     * Initializes and unlocks the GarminDeviceControl and starts the process
     * of communicating with the device.
     */
  	initController: function() {
			this.garminController = new Garmin.DeviceControl();
			this.garminController.register(this);

      var isUnlocked = this.garminController.unlock([
        ONOLOG.URL,
        GARMIN.API_KEY
      ]);

      // Abort if we can't unlock the controller for some reason
      if (!isUnlocked) {
        this.setStatus('The plug-in was not unlocked successfully.');
        this.garminController = null;
        return;
      }

      // Make sure the plugin is initialized, then find devices
      if (this.garminController &&
          this.garminController.isPluginInitialized()) {
  		  this.garminController.findDevices();
  		}
  	},

    onStartFindDevices: function(json) {
      this.setStatus('Looking for connected Garmin devices');
    },

    onFinishFindDevices: function(json) {
      var devices = json.controller.getDevices();
      if (!devices || devices.length === 0) {
        this.setState({ device: {} });
        this.setStatus('No devices found.');
  			return;
      }

      // If we've found a device, display the info
      this.setState({ device: devices[0] });
      this.clearStatus();

      // Start fetching and reading all the data from the device
      this.garminController.readDataFromDevice(this.state.fileType);
      this.setStatus('Fetching data from device');
    },

    /**
     * This method fires whenever the controller finishes reading from the
     * device, which can happen at different points and in different states.
     * Therefore, we always need to check what the dataType is so that we can
     * handle it properly.
     */
    onFinishReadFromDevice: function(json) {
      this.clearStatus();
      
      // Figure out how to handle the response depending on the dataType
      switch (json.controller.gpsDataType) {
				case TCX_DIR:
          this._handleDirectoryData(json.controller);
          break;
				case TCX_DETAIL:
          this._handleDetailData(json.controller);
          break;
        default:
          throw new Error('Unsupported Data Type');
          break;
      }
    },

    onFinishReadFitnessDetail: function(json) {
      debugger;
    },

    _readSelectedActivities: function() {
      if (!this.state.selectedActivities.length) {
        alert('At least one activity must be selected before attempting to read.');
        return;
      }
      debugger;
      this.garminController.readDetailFromDevice(
        TCX_DETAIL, // fileType
        this.state.selectedActivities[0]
      );
    },

    _handleSelectedActivities: function(selectedActivities) {
      this.setState({ selectedActivities: selectedActivities });
    },

    _handleDirectoryData: function(controller) {
    	// Factory for parsing the data into activities. Only support TCX for now,
    	// but this could change down the line.
      var factory = Garmin.TcxActivityFactory;
      var activities = this.state.activities;
      if (!activities.length) {
        // Parse and populate activities
        activities = factory.parseDocument(controller.gpsData);
      }

      this.setState({ activities: activities });
    },

    _handleDetailData: function(controller) {
      var selectedActivity = this.state.selectedActivity;
      if (!selectedActivity) {
        selectedActivity = this.state.selectedActivities[0];
        this.setState({ selectedActivity: selectedActivity });
      }

      this.garminController.readDetailFromDevice(
        TCX_DETAIL,
        selectedActivity
      );
    },

    /**
     * Convenience methods for setting and clearing state
     */
    setStatus: function(status) {
      this.setState({ status: status });
    },

    clearStatus: function() {
      this.setState({ status: '' });
    }

  });

});
