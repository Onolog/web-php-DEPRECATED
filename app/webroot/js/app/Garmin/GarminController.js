/**
 * GarminController.js
 *
 * Uses Garmin Connect API to communicate with a Garmin device
 */
define([

  'constants/Garmin',
  'constants/Onolog',

  'lib/garmin/activity/GpxActivityFactory',
  'lib/garmin/activity/TcxActivityFactory',
  'lib/garmin/device/GarminDeviceControl',
  'lib/garmin/device/GarminPluginUtils',
  'lib/garmin/device/GoogleMapController',

], function(

  GARMIN,
  ONOLOG,

  GpxActivityFactory,
  TcxActivityFactory,
  GarminDeviceControl,
  GarminPluginUtils,
  GoogleMapController

) {

  var GarminController = function() {};
  GarminController.prototype = {

  	initialize: function() {
      this.statusContainer = $('statusContainer');
      this.initializeController();

      this.mc = new Garmin.MapController('map');
      this.factory = null;

  		this.progressBar = $("progressBar");
  		this.progressBarDisplay = $("progressBarDisplay");
  		this.loader = $('statusLoader');

      this.fileTypeRead = Garmin.DeviceControl.FILE_TYPES.tcxDir;

      this.readTracksSelect = $("readTracksSelect");
  
  		this.activityListing = $("activityListing");

  		this.readSelectedButton = $("readSelectedButton");
  		this.readSelectedButton.onclick =
        this.onReadSelectedButtonClick.bind(this);

      // Checkbox used to check/select all directory checkboxes.
  		this.checkAllBox = $("checkAllBox");
  		this.checkAllBox.onclick = this._checkAllDirectory.bind(this);
  		this.checkAllBox.disabled = true;

      this.dataString = $("dataString");
      this.compressedDataString = $("compressedDataString");
  		
  		this.activityDirectory = null; // Array of activity ID strings in the directory
  		this.activitySelection = null; // Array of selected activity objects in the directory
  		this.activityQueue = null; // Queue of activity IDs to sync events
  		
  		if (this.garminController && this.garminController.isPluginInitialized()) {
  		  this.garminController.findDevices();
  		}
  	},
  	
  	initializeController: function() {
			this.garminController = new Garmin.DeviceControl();
			this.garminController.register(this);

      var status;
			if (this.garminController.unlock([
        ONOLOG.URL,
        GARMIN.API_KEY
      ])) {
        status ='Plug-in initialized. Find some devices to get started.';
			} else {
      	status = 'The plug-in was not unlocked successfully.';
      	this.garminController = null;
			}
      this.setStatus(status);
  	},

  	showProgressBar: function() {
  		Element.show(this.progressBar);
  	},

  	hideProgressBar: function() {
  		Element.hide(this.progressBar);
  	},

  	showLoader: function() {
  		Element.show(this.loader);
  	},

  	hideLoader: function() {
  		Element.hide(this.loader);
  	},
  
  	updateProgressBar: function(value) {
  		if (value) {
  			var percent = (value <= 100) ? value : 100;
        this.progressBarDisplay.style.width = percent + "%";
  		}
  	},

    onStartFindDevices: function(json) {
      this.setStatus('Looking for connected Garmin devices');
    },

    onFinishFindDevices: function(json) {
      if (json.controller.numDevices === 0) {
        this.setStatus('No devices found.');
        this.clearDeviceInfo();
  			return;
      }

      var devices = json.controller.getDevices();
      var status = devices.length === 1 ?
        'Found 1 device.' :
        'Found ' + devices.length + ' devices.';

      this.showDeviceInfo(devices[0]);
      this.setStatus(status);

      this.readFromDevice();
    },

    showDeviceInfo: function(device) {
      $('deviceName').innerHTML = device.getDisplayName();

      // TODO: This will return the incorrect version once it hits v10
      var version = device.getSoftwareVersion();
  		$('softwareVersion').innerHTML = version.split('').join('.');

  		$('partNumber').innerHTML = device.getPartNumber();
  		$('deviceID').innerHTML = device.getId();
  	},

    clearDeviceInfo: function() {
      $('deviceName').innerHTML = '--';
  		$('softwareVersion').innerHTML = '--';
  		$('partNumber').innerHTML = '--';
  		$('deviceID').innerHTML = '--';
    },
  
    onProgressReadFromDevice: function(json) {
	  	this.updateProgressBar(json.progress.getPercentage());
    	this.setStatus(json.progress);
    },

    readFromDevice: function() {
      this.garminController.readDataFromDevice(
        Garmin.DeviceControl.FILE_TYPES.tcxDir
      );

      this.activities = null;
    	this.readTracksSelect.length = 0;	
    	this.readSelectedButton.disabled = true;
    	this.checkAllBox.disabled = true;

  		this.mc.clearOverlays();
    	this.showProgressBar();
    	this._clearActivityListing();

    	this.checkAllBox.disabled = false;
    },

    /**
     * Fires when the UI has received all the tracks
     */
    onFinishReadFromDevice: function(json) {
      this.setStatus('Processing retrieved data...');
     	this.hideProgressBar();

      // Display data strings
    	this.dataString.value = json.controller.gpsDataString;
    	this.compressedDataString.value = json.controller.gpsDataStringCompressed;
    	
    	// Factory setting for parsing the data into activities if applicable.
      this.factory = Garmin.TcxActivityFactory;
  			
			// Convert the data obtained from the device into activities.
			// If we're starting a new read session, start a new activities array
			if (this.activities == null) {
				this.activities = [];
			}
			
			// Populate this.activities
			switch(this.fileTypeRead) {
				case Garmin.DeviceControl.FILE_TYPES.crsDir:
				case Garmin.DeviceControl.FILE_TYPES.tcxDir:
				  debugger;
					this.activities = this.factory.parseDocument(json.controller.gpsData);		    			
    			if (this.activities != null) {
	    			// If we read a directory, save the directory for the session
	    			this._createActivityDirectory();
    			}
					break;
				case Garmin.DeviceControl.FILE_TYPES.tcxDetail:
	      case Garmin.DeviceControl.FILE_TYPES.crsDetail:
    			// Store this read activity
    			this.activities = this.activities.concat(this.factory.parseDocument(json.controller.gpsData));
				  // Not finished with the activity queue
		    	if (this.activityQueue.length > 0) {
		    		this._readSelectedActivities();
		    		// Cleanest way to deal with the js single-thread issue for now.
		    		// Cutting out to immediately move on to the next activity in the queue before listing.
		    		return;
		    	}
    			break;
    		default:
    			this.activities = this.factory.parseDocument(json.controller.gpsData);
    			break;
			}
			
			// Finished reading activities in queue, if any
			if (this.activityQueue == null || this.activityQueue.length == 0 ) {
      	if (this.fileTypeRead != Garmin.DeviceControl.FILE_TYPES.tcxDir && this.fileTypeRead != Garmin.DeviceControl.FILE_TYPES.crsDir) {
          // List the activities (and display on Google Map)
          if (this.activities != null) {
  		    	this.setStatus('Listing activities...');
  		    	var summary = this._listActivities(this.activities);
  		    	this.setStatus(new Template(
  	    	    "Results: #{routes} routes, #{tracks} tracks and  #{waypoints} " +
  	    	    "waypoints found"
  	    	  ).evaluate(summary));
          } else {
  				  this.setStatus('Finished retrieving data.');
          } 
      	} else {
          // List the activity directory
          if (this.activities != null) {
  	    		this.setStatus('Listing activity directory…');
  	    		var summary = this._listDirectory(this.activities);
  	    		this.setStatus(new Template(
              "Results: #{routes} routes, #{tracks} tracks and  #{waypoints} " +
              "waypoints found"
            ).evaluate(summary));
          } else {
  				  this.setStatus('Finished retrieving data.');
          }
      	}

  			this.readSelectedButton.disabled = false;
  			this.checkAllBox.disabled = false;
  		}
    },

    onReadSelectedButtonClick: function() {
      if (this._directoryHasSelected() == false) {
        alert('At least one activity must be selected before attempting to read.');
        return;
      }
  
      this.activities = null;
      this.readTracksSelect.length = 0;
      this.mc.clearOverlays();
    	this.readSelectedButton.disabled = true;
  
      this.showProgressBar();
    
    	if (this.fileTypeRead == Garmin.DeviceControl.FILE_TYPES.tcxDir) {
    		this.fileTypeRead = Garmin.DeviceControl.FILE_TYPES.tcxDetail;
    	} else if (this.fileTypeRead == Garmin.DeviceControl.FILE_TYPES.crsDir) {
    		this.fileTypeRead = Garmin.DeviceControl.FILE_TYPES.crsDetail;
    	}
  	 
      this._populateActivityQueue();
      this._readSelectedActivities();
    	this.checkAllBox.disabled = false;
    },
      
    /**
     * Reads the user-selected activities from the device by using the activity queue. 
     */
    _readSelectedActivities: function() {
    	// Pop the selected activity off the queue.  (The queue only holds selected activities)
    	var currentActivity = this.activityQueue.last();
    	this.garminController.readDetailFromDevice(this.fileTypeRead, $(currentActivity).value);
    	this.activityQueue.pop();
    },
        
    _clearActivityListing: function() {
    	// clear previous data, if any (keep the header). IE deletes header too...
  		while (this.activityListing.rows.length > 0) {
  			this.activityListing.deleteRow(0);
  		}
    },
        
    /**
     * Creates the activity directory of all activities on the device
     * of the user-selected type. Most recent entries are first.
     */
    _createActivityDirectory: function() {
    	this.activityDirectory = new Array();
    	this.activityQueue = new Array(); // Initialized here so that we can detect activity selection read status
    	
    	for (var jj = 0; jj < this.activities.length; jj++) {
    		this.activityDirectory[jj] = this.activities[jj].getAttribute("activityName");
    	}
    },
        
    /**
     * Creates the activity queue of selected activities. This should be called
     * only after the user has finished selecting activities.  The queue
     * is an Array that is constructed and then reversed to simulate a queue.
     */
    _populateActivityQueue: function() {
    	for( var jj = 0; jj < this.activityDirectory.length; jj++) {
    		if ($("activityItemCheckbox" + jj).checked == true){
    			this.activityQueue.push("activityItemCheckbox" + jj);
    		}
    	}
  
    	// Reverse the array to turn it into a queue
    	this.activityQueue.reverse(); 
    },

  	/** The activityListing object is the HTML table element on the demo page.  This function
  	 * adds the necessary row to the table with the activity data.
  	 */
  	_addToActivityListing: function(index, activity) {
  		
  		var selectIndex = 0;
  		var nameIndex = 1;
  		
  		var activityName = activity.getAttribute("activityName");
  		
  		var row = this.activityListing.insertRow(this.activityListing.rows.length); // append a new row to the table
  		var selectCell = row.insertCell(selectIndex);
  		var nameCell = row.insertCell(nameIndex);
  		
  		var checkbox = document.createElement("input");
  		checkbox.id = "activityItemCheckbox" + index;
  		checkbox.type = "checkbox";
  		checkbox.value = activityName;
  		
  		selectCell.appendChild(checkbox);
  		
  		if (this.fileTypeRead == Garmin.DeviceControl.FILE_TYPES.tcxDir) {
  			nameCell.innerHTML = activity.getSummaryValue(Garmin.Activity.SUMMARY_KEYS.startTime).getValue().getDateString() 
  									+ " (Duration: " + activity.getStartTime().getDurationTo(activity.getEndTime()) + ")"; // Correct time zone
  		} else if (this.fileTypeRead == Garmin.DeviceControl.FILE_TYPES.crsDir ) {
  			nameCell.innerHTML = activityName;
  		}
  	},
  	
  	/**
  	 * Selects all checkboxes in the activity directory, which selects all activities to be read from the device.
  	 */
  	_checkAllDirectory: function() {
  		for (var boxIndex=0; boxIndex < this.activityDirectory.length; boxIndex++) {
  			$("activityItemCheckbox" + boxIndex).checked = this.checkAllBox.checked;
  		}
  	},
  	
  	/**
  	 * Checks if any activities in directory listing are selected.
  	 * Returns true if so, false otherwise.
  	 */
  	_directoryHasSelected: function() {
  		for (var boxIndex=0; boxIndex < this.activityDirectory.length; boxIndex++) {
  			if ( $("activityItemCheckbox" + boxIndex).checked == true) {
  				return true;
  			}
  		}
  		return false;
  	},
  	
  	/**
  	 * Lists the directory and returns summary data (# of tracks). 
  	 */
  	_listDirectory: function(activities) {
  		var numOfRoutes = 0;
  		var numOfTracks = 0;
  		var numOfWaypoints = 0;
  		
  		// clear existing entries
  		this._clearHtmlSelect(this.readTracksSelect);
  		
  		// loop through each activity
  		for (var i = 0; i < activities.length; i++) {
  			var activity = activities[i];
  			
  			// Directory entry
  			if (this.fileTypeRead == Garmin.DeviceControl.FILE_TYPES.tcxDir || this.fileTypeRead == Garmin.DeviceControl.FILE_TYPES.crsDir) {
  				this._addToActivityListing(i, activity);
  			}
  			
  			numOfTracks++;
  		}
  		
  		return {routes: numOfRoutes, tracks: numOfTracks, waypoints: numOfWaypoints};
  	},
  	
  	/**
  	 * List activities and display on Google Map when appropriate.
  	 */
    _listActivities: function(activities) {
  		var numOfTracks = 0;
  		
  		// clear existing entries
  		this._clearHtmlSelect(this.readTracksSelect);
  		
  		// loop through each activity
  		for (var i = 0; i < activities.length; i++) {
  			var activity = activities[i];
  			var series = activity.getSeries();
  			
  				// loop through each series in the activity
  			for (var j = 0; j < series.length; j++) {
  				var curSeries = series[j];		
  				
  				switch(curSeries.getSeriesType()) {
  					case Garmin.Series.TYPES.history:
  						// activity contains a series of type history, list the track
  						this._listTrack(activity, curSeries, i, j);
  						numOfTracks++;
  						break;
  					case Garmin.Series.TYPES.route:
  						// activity contains a series of type route, list the route
  						this._listRoute(activity, curSeries, i, j);
  						numOfRoutes++;
  						break;
  					case Garmin.Series.TYPES.waypoint:
  						// activity contains a series of type waypoint, list the waypoint
  						this._listWaypoint(activity, curSeries, i, j);				
  						numOfWaypoints++;
  						break;
  					case Garmin.Series.TYPES.course:
  						// activity contains a series of type course, list the coursetrack
  						this._listCourseTrack(activity, curSeries, i, j);				
  						numOfTracks++;
  						break;
  				}	
  			}
  		}
  		
  		if (numOfTracks > 0) {
  			this.readTracksSelect.disabled = false;
  			this.displayTrack(this.readTracksSelect.options[this.readTracksSelect.selectedIndex].value);
  			this.readTracksSelect.onchange = function() {
          this.mc.clearOverlays();
  				this.displayTrack(this.readTracksSelect.options[this.readTracksSelect.selectedIndex].value);
  			}.bind(this);
  		} else {
  			this.readTracksSelect.disabled = true;
  		}
  		
  		return { tracks: numOfTracks };
  	},
  
    /**
     * Load track name into select UI component.
     * @private
     */
  	_listTrack: function(activity, series, activityIndex, seriesIndex) {
  		var startDate = activity.getSummaryValue(Garmin.Activity.SUMMARY_KEYS.startTime).getValue();
  		var endDate = activity.getSummaryValue(Garmin.Activity.SUMMARY_KEYS.endTime).getValue();
  		var trackName = startDate.getDateString() + " (Duration: " + startDate.getDurationTo(endDate) + ")";
  		this.readTracksSelect.options[this.readTracksSelect.length] = new Option(trackName, activityIndex + "," + seriesIndex);
  	},
  	
  	/**
  	 * Load track name into select UI component.
     * @private
     */    
  	_listCourseTrack: function(activity, series, activityIndex, seriesIndex) {
  		var trackName = activity.getAttribute(Garmin.Activity.ATTRIBUTE_KEYS.activityName);
  		this.readTracksSelect.options[this.readTracksSelect.length] = new Option(trackName, activityIndex + "," + seriesIndex);
  	},
      
    /**
     * Draws a simple line on the map using the Garmin.MapController.
     * @param {Select} index - value of select widget. 
     */
    displayTrack: function(index) {
    	index = index.split(",", 2);
    	var activity = this.activities[parseInt(index[0])];
    	var series = activity.getSeries()[parseInt(index[1])];


		  this.mc.clearOverlays();
    	if (series.findNearestValidLocationSample(0,1) != null) {
        this.mc.drawTrack(series);
    	}
    },
  
    /**
     * Draws a point (usualy as a thumb tack) on the map using the Garmin.MapController.
     * @param {Select} index - value of select widget. 
     */
    displayWaypoint: function(index) {
    	index = index.split(",", 2);
    	var activity = this.activities[parseInt(index[0])];
    	var series = activity.getSeries()[parseInt(index[1])];

  		this.mc.clearOverlays();
      this.mc.drawWaypoint(series);
    },

  	/**
  	 * Sets the size of the select options to zero which essentially clears it
  	 * from any values.
  	 * @private
  	 */
    _clearHtmlSelect: function(select) {
  		if(select) {
  			//select.size = 0;
  			select.options.size = 0;
  		}
    },
  
    onException: function(json) {
	    this.handleException(json.msg);
    },
  
  	handleException: function(error) {
  		var msg = error.name + ": " + error.message;	
  		if (Garmin.PluginUtils.isDeviceErrorXml(error)) {
  			msg = Garmin.PluginUtils.getDeviceErrorMessage(error);	
  		}
	    this.setStatus(msg);
	    alert(msg);
  	},
  
  	setStatus: function(status) {
      // TODO: Set error or message
      this.statusContainer.innerHTML = status;
  	}

	};

  return GarminController;

});
