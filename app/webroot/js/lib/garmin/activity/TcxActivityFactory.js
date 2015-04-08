if (Garmin == undefined) var Garmin = {};
/**
 * Copyright &copy; 2007-2010 Garmin Ltd. or its subsidiaries.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License')
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @fileoverview Garmin.TcxActivityFactory - A factory for producing tcx activity and data.
 * @version 1.9
 */

/**
 * A factory that can produce an array activity given tcx xml and produce tcx xml given an
 * array of activity.
 * many other types of data.
 * @class Garmin.TcxActivityFactory
 * @constructor 
 */
define([

  // Dependencies
  'lib/garmin/activity/GarminActivity',
  'lib/garmin/activity/GarminSample',
  'lib/garmin/activity/GarminSeries',
  'lib/garmin/util/Util-DateTimeFormat',
  'lib/garmin/util/Util-XmlConverter'

], function(

    GarminActivity,
    GarminSample,
    GarminSeries,
    DateTimeFormat,
    XmlConverter

) {

  var SCHEMA_TAGS = {
  	activities:					 "Activities",
  	activity:					   "Activity",
  	activityId:					 "Id",
  	activitySport:			 "Sport",
  	author:						   "Author",
  	course:						   "Course",
  	courses:					   "Courses",
  	courseName:					 "Name",
  	creator:					   "Creator",
  	creatorName:				 "Name",
  	creatorUnitID:			 "UnitId",
  	creatorProductID:		 "ProductID",
  	elevationGain:       "ElevationGain",
  	lap:						     "Lap",
  	lapAverageHeartRate: "AverageHeartRateBpm",
  	lapCadence:					 "Cadence",
  	lapCalories:				 "Calories",
  	lapDistance:				 "DistanceMeters",
  	lapElevationChange:  "ElevationChange",
  	lapIntensity:				 "Intensity",
  	lapMaxHeartRate:		 "MaximumHeartRateBpm",
  	lapMaxSpeed:				 "MaximumSpeed",
  	lapNotes:					   "Notes",
  	lapStartTime:				 "StartTime",
  	lapTotalTime:				 "TotalTimeSeconds",
  	lapTriggerMethod:		 "TriggerMethod",
  	multiSportSession:	 "MultiSportSession",
  	nextSport:					 "NextSport",
  	position:				  	 "Position",
  	positionLatitude:		 "LatitudeDegrees",
  	positionLongitude:	 "LongitudeDegrees",
  	track:						   "Track",
  	trackPoint:					 "Trackpoint",
  	trackPointCadence:	 "Cadence",
  	trackPointDistance:	 "DistanceMeters",
  	trackPointElevation: "AltitudeMeters",	
  	trackPointHeartRate: "HeartRateBpm",
  	trackPointHeartRateValue:	"Value",
  	trackPointSensorState: "SensorState",
  	trackPointTime:				"Time",
  	version:					"Version",
  	versionBuildMajor:			"BuildMajor",
  	versionBuildMinor:			"BuildMinor",	
  	versionMajor:				"VersionMajor",
  	versionMinor:				"VersionMinor"
  };

  Garmin.TcxActivityFactory = function() {};
  Garmin.TcxActivityFactory = {
  	
  	parseString: function(tcxString) {
  		var tcxDocument = Garmin.XmlConverter.toDocument(tcxString);		
  		return Garmin.TcxActivityFactory.parseDocument(tcxDocument);		
  	},
  	
  	/* Creates and returns an array of activities from the document. */
  	parseDocument: function(tcxDocument) {
  		// Not TCX parseable
  		if (
  		  tcxDocument.getElementsByTagName(SCHEMA_TAGS.activities).length == 0 &&
  			tcxDocument.getElementsByTagName(SCHEMA_TAGS.courses).length == 0
  		) {
  			throw new Error("ERROR: Unable to parse TCX document.");
  		}
  		
  		var parsedDocument;
  		var activities = tcxDocument.getElementsByTagName(SCHEMA_TAGS.activity);
  		var tracks = tcxDocument.getElementsByTagName(SCHEMA_TAGS.track);
  		var courses = tcxDocument.getElementsByTagName(SCHEMA_TAGS.course);
  		var laps = tcxDocument.getElementsByTagName(SCHEMA_TAGS.lap);
  		
  		// Activities		
  		if (activities.length >= 0) {
  			if (tracks.length >= 0) { 
  				// Complete activity
  				parsedDocument = Garmin.TcxActivityFactory._parseTcxActivities(tcxDocument);
  			} else {
  				// Directory listing
  				parsedDocument = Garmin.TcxActivityFactory._parseTcxHistoryDirectory(tcxDocument);
  			}
      // Courses
  		} else if (courses.length >= 0) {
  			if (laps.length >= 0) {
  				// Complete course
  				parsedDocument = Garmin.TcxActivityFactory._parseTcxCourses(tcxDocument);
  			} else {
  				// Directory listing
  				parsedDocument = Garmin.TcxActivityFactory._parseTcxCourseDirectory(tcxDocument);
  			}
  		}

  		return parsedDocument;
  	},
  	
  	produceString: function(activities) {
  		var tcxString = '';
  		
  		// header tags
  		tcxString += '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>';
  		tcxString += '\n<TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd http://www.garmin.com/xmlschemas/FatCalories/v1 http://www.garmin.com/xmlschemas/fatcalorieextensionv1.xsd">';
  		tcxString += '\n  <Activities>';
  		
  		if (activities != null && activities.length > 0) {			
  			// activity tags
  			for (var i = 0; i < activities.length; i++) {
  				tcxString += "\n    " + Garmin.TcxActivityFactory._produceActivityString(activities[i]);
  			}
  			tcxString += '\n  </Activities>';
  			
  			// author tag
  			var activityDom = activities[0].getAttribute(Garmin.Activity.ATTRIBUTE_KEYS.dom);
  			if (activityDom != null) {
  				var authorDom = activityDom.ownerDocument.getElementsByTagName(SCHEMA_TAGS.author);
  				if (authorDom.length > 0) {
  					tcxString += "\n  " + Garmin.XmlConverter.toString(authorDom[0]);
  				}
  			}
  		}
  
  		// footer tags
  		tcxString += '\n</TrainingCenterDatabase>';
  				
  		return tcxString;
  	},
  	
  	/** Fully load the sample, assume sample was previously lazy-loaded
  	 */	
  	finishLoadingSample: function(domNode, sample) {
  		Garmin.TcxActivityFactory._parseTcxTrackPoint(domNode, sample);
  		sample.isLazyLoaded = false;
  	},	
  	
  	_produceActivityString: function(activity) {
  		var activityString = "";
  		
  		if (activity != null) {
  			// converting the dom back into string
  			// this is the lazy way, this will not work if 
  			// converting between file types or activity data
  			// has been modified.
  			var activityDom = activity.getAttribute(Garmin.Activity.ATTRIBUTE_KEYS.dom);			
  			if (activityDom != null) {
  				activityString = Garmin.XmlConverter.toString(activityDom);
  			}
  		}
  		
  		return activityString;
  	},
  	
  	_parseTcxHistoryDirectory: function(tcxDocument) {
  		var activities = [];
  		var activityNodes;
  
  		// Grab the activity/course nodes, depending on document		
  		activityNodes = tcxDocument.getElementsByTagName(SCHEMA_TAGS.activity);
  		
  		// loop through all activities in the document
  		for (var i = 0; i < activityNodes.length; i++) {
  			
  			if (activityNodes[i].parentNode.tagName != SCHEMA_TAGS.nextSport ){
  				// create new activity object
  				var activity = Garmin.TcxActivityFactory._parseTcxActivity(
  				  activityNodes[i],
  				  SCHEMA_TAGS.activity
  				);
  				
  				// grab all the lap nodes in the dom			
  				var lapNodes = activityNodes[i].getElementsByTagName(SCHEMA_TAGS.lap);
  				
  				// grab start time from the first lap and set duration to 0
  				if (lapNodes.length > 0) {
  					var activityStartTimeMS = lapNodes[0].getAttribute(SCHEMA_TAGS.lapStartTime);
  					var activityDurationMS = 0;	// in ms
  				}			
  				
  				// loop through all laps in this activity
  				for (var j = 0; j < lapNodes.length; j++) {
  					
  					// Update the duration of this activity
  					var lapTotalTime = Garmin.TcxActivityFactory._tagValue(
              lapNodes[j],
              SCHEMA_TAGS.lapTotalTime
            );
  					activityDurationMS += parseFloat(lapTotalTime + "e+3");
  				}
  				
  				if (lapNodes.length > 0) {
  					// set the start and end time summary data for the activity if possible
  					activityStartTimeObj = (new Garmin.DateTimeFormat()).parseXsdDateTime(activityStartTimeMS);
  					activityEndTimeObj	=  new Garmin.DateTimeFormat();
  					// NOTE: switch to using setDate() once it is implemented in Garmin.DateTimeFormat
  					activityEndTimeObj.date = new Date(activityStartTimeObj.getDate().getTime() + activityDurationMS);
  					activity.setSummaryValue(Garmin.Activity.SUMMARY_KEYS.startTime, activityStartTimeObj);
  					activity.setSummaryValue(Garmin.Activity.SUMMARY_KEYS.endTime, activityEndTimeObj);
  				}
  				
  				// Add the populated activity to the list of activities.  This activity may not have laps (if it's a directory listing entry).
  				activities.push(activity);
  			}
  		}

  		return activities;
  	},

    /**
     * WTF is a Course Directory as opposed to a normal activity?
     */
  	_parseTcxCourseDirectory: function(tcxDocument) {
  		var activities = [];
  		var activityNodes;
  
  		// Grab the activity/course nodes, depending on document		
  		activityNodes = tcxDocument.getElementsByTagName(SCHEMA_TAGS.course);
  		
  		// Loop through all activities in the document
  		// Can there be more than one activity per document?
  		for (var i = 0; i < activityNodes.length; i++) {
  			// create new activity object
  			var activity = Garmin.TcxActivityFactory._parseTcxActivity(
          activityNodes[i],
          SCHEMA_TAGS.course
        );
  			
  			// Add the populated activity to the list of activities.  This activity will not have laps.
  			activities.push(activity);
  		}
  		
  		return activities;
  	},

    /**
     * 
     */
  	_parseTcxActivities: function(tcxDocument) {
  		var activities = [];
  		var activityNodes;

  		// Grab the activity/course nodes, depending on document
  		activityNodes = tcxDocument.getElementsByTagName(SCHEMA_TAGS.activity);
  		
  		// Loop through all activities in the document
  		for (var i=0; i < activityNodes.length; i++) {

  			if (activityNodes[i].parentNode.tagName === SCHEMA_TAGS.nextSport ) {
  		    continue;
  		  }
	
  			// create new activity object
  			var activity = Garmin.TcxActivityFactory._parseTcxActivity(
          activityNodes[i],
          SCHEMA_TAGS.activity
        );
  			
  			// create a history series for all the trackpoints in this activity
  			var historySeries = new Garmin.Series(Garmin.Series.TYPES.history);
  			
  			// grab all the lap nodes in the dom			
  			var lapNodes = activityNodes[i].getElementsByTagName(SCHEMA_TAGS.lap);

        // Get start time from the first lap and set duration to 0
				var activityStartTimeMS =
				  lapNodes[0] && lapNodes[0].getAttribute(SCHEMA_TAGS.lapStartTime);
				var activityDurationMS = 0;	// in ms
				var totalDistance = 0;
				var calories = 0;
				var maxSpeed = 0;
				var avgHeartRate = 0;
				var maxHeartRate = 0;
				var intensity;
				var elevationGain = 0;

  			// loop through all laps in this activity
  			for (var j=0; j<lapNodes.length; j++) {

          var lap = this._parseTcxLap(lapNodes[j], j);

  				// Update the activity info
  				activityDurationMS += parseFloat(lap[SCHEMA_TAGS.lapTotalTime] + "e+3");
  				totalDistance += parseFloat(lap[SCHEMA_TAGS.lapDistance]);
  				calories += parseInt(lap[SCHEMA_TAGS.lapCalories]);
          maxSpeed = lap[SCHEMA_TAGS.lapMaxSpeed] > maxSpeed ?
            lap[SCHEMA_TAGS.lapMaxSpeed] : maxSpeed;
  				avgHeartRate += parseInt(lap[SCHEMA_TAGS.lapAverageHeartRate]);
          maxHeartRate = lap[SCHEMA_TAGS.lapMaxHeartRate] > maxHeartRate ?
            lap[SCHEMA_TAGS.lapMaxHeartRate] : maxHeartRate;

  				/* not implemented until sections are in place
  				// create lap section
  				// set start time
  				// set total time
  				// set max speed
  				// set intensity
  				// set trigger method
  				*/

          var prevTrackPoint;
          var lapElevationGain = 0;
          var lapElevationLoss = 0;

    			// Loop through all the tracks in this lap
    			var trackPointNodes = this._getTrackPointNodes(lapNodes[j]);
    			for (var ll=0; ll<trackPointNodes.length; ll++) {
    				var trackPoint = new Garmin.Sample();
    				trackPoint.setLazyLoading(
              true,
              Garmin.TcxActivityFactory,
              trackPointNodes[ll]
            );

            if (ll !== 0) {
              var elevChange =
                trackPoint.getElevation() - prevTrackPoint.getElevation();
              if (elevChange > 0) {
                lapElevationGain += elevChange;
              } else {
                lapElevationLoss += elevChange;
              }
            }
            prevTrackPoint = trackPoint;

            // Add the trackpoint the historySeries for plotting on a map
    				historySeries.addSample(trackPoint);
    			}

          // Add net elevation change to lap data
          lap[SCHEMA_TAGS.lapElevationChange] =
            lapElevationGain + lapElevationLoss;

          // Increment activity elevation gain
          elevationGain += lapElevationGain;

          // Add the lap to the activity
          activity.addLap(lap);
  			}
  			
  			if (lapNodes.length) {
          var SUMMARY_KEYS = Garmin.Activity.SUMMARY_KEYS;

  				// set the start and end time summary data for the activity if possible
  				activityStartTimeObj =
  				  (new Garmin.DateTimeFormat()).parseXsdDateTime(activityStartTimeMS);
  				activityEndTimeObj	=  new Garmin.DateTimeFormat();
  				// NOTE: switch to using setDate() once it is implemented in Garmin.DateTimeFormat
  				activityEndTimeObj.date =
  				  new Date(activityStartTimeObj.getDate().getTime() + activityDurationMS);
  				avgHeartRate = avgHeartRate / lapNodes.length;

  				activity.setSummaryValue(SUMMARY_KEYS.startTime, activityStartTimeObj);
  				activity.setSummaryValue(SUMMARY_KEYS.endTime, activityEndTimeObj);
  				activity.setSummaryValue(SUMMARY_KEYS.totalDistance, totalDistance);
  				activity.setSummaryValue(SUMMARY_KEYS.calories, calories);
  				activity.setSummaryValue(SUMMARY_KEYS.maxSpeed, maxSpeed);
  				activity.setSummaryValue(SUMMARY_KEYS.avgHeartRate, avgHeartRate);
  				activity.setSummaryValue(SUMMARY_KEYS.maxHeartRate, maxHeartRate);
  				activity.setSummaryValue(SUMMARY_KEYS.elevationGain, elevationGain);
  			}
  			
  			if (historySeries.getSamplesLength() > 0) {				
  				// add the populated series to the activity
  				activity.addSeries(historySeries);
  			}
  			
  			// Add the populated activity to the list of activities. This activity 
  			// may not have laps (if it's a directory listing entry).
  			activities.push(activity);
  		}
  		
  		return activities;
  	},
  	
  	_parseTcxCourses: function(tcxDocument) {
  		var activities = [];
  		var activityNodes;
  
  		// Grab the course nodes, depending on document		
  		activityNodes = tcxDocument.getElementsByTagName(Garmin.TcxActivityFactory.SCHEMA_TAGS.course);
  		
  		// loop through all activities in the document
  		for (var i = 0; i < activityNodes.length; i++) {
  			
  			// create new activity object
  			var activity = Garmin.TcxActivityFactory._parseTcxActivity(activityNodes[i], Garmin.TcxActivityFactory.SCHEMA_TAGS.course);
  			
  			// create a history series for all the trackpoints in this activity
  			var historySeries = new Garmin.Series(Garmin.Series.TYPES.course);
  			
  			// grab all the lap nodes in the dom			
  			var lapNodes = activityNodes[i].getElementsByTagName(Garmin.TcxActivityFactory.SCHEMA_TAGS.lap);
  			
  			// grab start time from the first lap and set duration to 0
  			if (lapNodes.length > 0) {
  				var activityDurationMS = 0;	// in ms
  			}		
  			
  			// loop through all laps in this activity
  			for (var j = 0; j < lapNodes.length; j++) {
  				
  				// update the duration of this activity
  				var lapTotalTime = Garmin.TcxActivityFactory._tagValue(lapNodes[j], Garmin.TcxActivityFactory.SCHEMA_TAGS.lapTotalTime);
  				activityDurationMS += parseFloat(lapTotalTime + "e+3");
  				
  				/* not implemented until sections are in place
  				// create lap section
  				// set start time				
  				// set total time				
  				// set distance				
  				// set max speed				
  				// set calories				
  				// set intensity				
  				// set trigger method
  				*/
  			}
  			
  			// loop through all the tracks in this lap
  			var trackNodes = activityNodes[i].getElementsByTagName(Garmin.TcxActivityFactory.SCHEMA_TAGS.track);			
  			for (var k = 0; k < trackNodes.length; k++) {
  				
  				/* not implemented until sections are in place
  				// create track section
  				*/					
  				
  				// loop through all the trackpoints in this track
  				var trackPointNodes = trackNodes[k].getElementsByTagName(Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPoint);
  				for (var l = 0; l < trackPointNodes.length; l++) {
  					//historySeries.addSample(Garmin.TcxActivityFactory._parseTcxTrackPoint(trackPointNodes[l]));
  					var trackPoint = new Garmin.Sample();
  					trackPoint.setLazyLoading(true, Garmin.TcxActivityFactory, trackPointNodes[l]);
  					historySeries.addSample(trackPoint);
  					//historySeries.addSample(new Garmin.Sample());
  				}					
  			}
  			
  			if (historySeries.getSamplesLength() > 0) {				
  				// add the populated series to the activity
  				activity.addSeries(historySeries);
  			}
  			
  			// Add the populated activity to the list of activities.  This activity may not have laps (if it's a directory listing entry).
  			activities.push(activity);
  		}
  		
  		return activities;
  	},
  	
  	_parseTcxActivity: function(activityNode, activityType) {
  		// create new activity object
  		var activity = new Garmin.Activity();
  		
  		// set lazy loaded
  		activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.isLazyLoaded, true);
  		
  		// set factory
  		activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.factory, Garmin.TcxActivityFactory);
  		
  		// set dom
  		activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.dom, activityNode);
  		
  		// set id
  		var id;
  		if (activityType == Garmin.TcxActivityFactory.SCHEMA_TAGS.activity) {
  			id = Garmin.TcxActivityFactory._tagValue(
          activityNode,
          Garmin.TcxActivityFactory.SCHEMA_TAGS.activityId
        );
  		} else {
  			id = Garmin.TcxActivityFactory._tagValue(
          activityNode,
          Garmin.TcxActivityFactory.SCHEMA_TAGS.courseName
        );
  		}
  		activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.activityName, id)		
  		
  		// set sport
  		var sport = activityNode.getAttribute(Garmin.TcxActivityFactory.SCHEMA_TAGS.activitySport);
  		activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.activitySport, sport);	
  		
  		// set creator information, optional in schema
  		var creator = activityNode.getElementsByTagName(Garmin.TcxActivityFactory.SCHEMA_TAGS.creator);
  		if (creator != null && creator.length > 0) {
  			// set creator name
  			var creatorName = Garmin.TcxActivityFactory._tagValue(creator[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.creatorName);
  			activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.creatorName, creatorName);
  			
  			// set creator unit id
  			var unitId = Garmin.TcxActivityFactory._tagValue(creator[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.creatorUnitID);
  			activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.creatorUnitId, unitId);
  							
  			// set creator product id
  			var prodId = Garmin.TcxActivityFactory._tagValue(creator[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.creatorProductID);
  			activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.creatorProdId, prodId);
  							
  			// set creator version
  			var version = Garmin.TcxActivityFactory._parseTcxVersion(creator[0]);
  			if (version != null) {
  				activity.setAttribute(Garmin.Activity.ATTRIBUTE_KEYS.creatorVersion, version);
  			}
  		}
  		
  		return activity;
  	},

    /**
     * Returns an object with all the values for the lap.
     */
  	_parseTcxLap: function(/*element*/ lapNode, /*number*/ index) /*object*/ {
      var tags = [
        SCHEMA_TAGS.lapTotalTime,
        SCHEMA_TAGS.lapDistance,
        SCHEMA_TAGS.lapCalories,
        SCHEMA_TAGS.lapMaxSpeed,
        SCHEMA_TAGS.lapAverageHeartRate,
        SCHEMA_TAGS.lapMaxHeartRate
      ];
      var lapValues = {};
      lapValues[SCHEMA_TAGS.lap] = index + 1;

      tags.forEach(function(tag) {
        lapValues[tag] = Garmin.TcxActivityFactory._tagValue(lapNode, tag);
      });

      return lapValues;
  	},

    _getTrackPointNodes: function(/*element*/ lapNode) /*HTMLCollection*/ {
      // TODO: Confirm that there is only ever one track per lap
      var trackNode = lapNode.getElementsByTagName(SCHEMA_TAGS.track)[0];
      return trackNode.getElementsByTagName(SCHEMA_TAGS.trackPoint);
    },

  	_parseTcxTrackPoint: function(trackPointNode, trackPointSample) {
  		// create a sample for this trackpoint if needed
  		if (trackPointSample == null) {
  			trackPointSample = new Garmin.Sample();
  		}
  		/*
  		var trackPointValueNodes = trackPointNode.childNodes;
  		for (var i = 1; i < trackPointValueNodes.length; i += 2) {
  			if (trackPointValueNodes[i].nodeType == 1 && trackPointValueNodes[i].hasChildNodes()) {
  				var nodeValue = trackPointValueNodes[i].childNodes[0].nodeValue;
  				if (nodeValue != null) {
  					switch(trackPointValueNodes[i].nodeName) {
  						case Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointTime:
  							trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.time, (new Garmin.DateTimeFormat()).parseXsdDateTime(nodeValue));						
  							break;						
  						case Garmin.TcxActivityFactory.SCHEMA_TAGS.position:
  							//var latitude = Garmin.TcxActivityFactory._tagValue(trackPointValueNodes[i], Garmin.TcxActivityFactory.SCHEMA_TAGS.positionLatitude);		
  							//var longitude = Garmin.TcxActivityFactory._tagValue(trackPointValueNodes[i], Garmin.TcxActivityFactory.SCHEMA_TAGS.positionLongitude);
  							var latitude = trackPointValueNodes[i].childNodes[1].childNodes[0].nodeValue;
  							var longitude = trackPointValueNodes[i].childNodes[3].childNodes[0].nodeValue;
  							trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.latitude, latitude);
  							trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.longitude, longitude);						
  							break;						
  						case Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointElevation:
  							trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.elevation, nodeValue);
  							break;
  						case Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointDistance:
  							trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.distance, nodeValue);
  							break;
  						case Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointHeartRate:
  							//var heartRate = Garmin.TcxActivityFactory._tagValue(trackPointValueNodes[i], Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointHeartRateValue);
  							var heartRate = trackPointValueNodes[i].childNodes[1].childNodes[0].nodeValue;
  							trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.heartRate, heartRate);
  							break;
  						case Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointCadence:
  							trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.cadence, nodeValue);
  							break;
  						case Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointSensorState:
  							trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.sensorState, nodeValue);
  							break;																																				
  						default:
  					}
  				}
  			}
  		}
  		*/
  		
  		// set time
  		var time = Garmin.TcxActivityFactory._tagValue(trackPointNode, Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointTime);
  		trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.time, (new Garmin.DateTimeFormat()).parseXsdDateTime(time));	
  
  		// set latitude and longitude, optional in schema (signal loss, create signal section);					
  		var position = trackPointNode.getElementsByTagName(Garmin.TcxActivityFactory.SCHEMA_TAGS.position);
  		if (position.length > 0) {
  			var latitude = Garmin.TcxActivityFactory._tagValue(position[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.positionLatitude);		
  			var longitude = Garmin.TcxActivityFactory._tagValue(position[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.positionLongitude);
  			trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.latitude, latitude);
  			trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.longitude, longitude);						
  		}
  					
  		// set elevation, optional in schema
  		var elevation = Garmin.TcxActivityFactory._tagValue(trackPointNode, Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointElevation);
  		if (elevation != null) {
  			trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.elevation, elevation);
  		}
  		
  		// set distance, optional in schema
  		var distance = Garmin.TcxActivityFactory._tagValue(trackPointNode, Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointDistance);
  		if (distance != null) {
  			trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.distance, distance);
  		}
  
  		// set heart rate, optional in schema
  		var heartRateNode = trackPointNode.getElementsByTagName(Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointHeartRate);
  		if (heartRateNode.length > 0) {
  			var heartRate = Garmin.TcxActivityFactory._tagValue(heartRateNode[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointHeartRateValue);
  			trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.heartRate, heartRate);
  		}
  
  		// set cadence, optional in schema
  		var cadence = Garmin.TcxActivityFactory._tagValue(trackPointNode, Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointCadence);
  		if (cadence != null) {
  			trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.cadence, cadence);
  		}
  
  		// set sensor state, optional in schema
  		var sensorState = Garmin.TcxActivityFactory._tagValue(trackPointNode, Garmin.TcxActivityFactory.SCHEMA_TAGS.trackPointSensorState);
  		if (sensorState != null) {
  			trackPointSample.setMeasurement(Garmin.Sample.MEASUREMENT_KEYS.sensorState, sensorState);
  		}

  		return trackPointSample;
  	},

  	_parseTcxVersion: function(parentNode) {
  		// find the version node
  		var versionNodes = parentNode.getElementsByTagName(Garmin.TcxActivityFactory.SCHEMA_TAGS.version);

  		// if there is a version node
  		if (versionNodes.length > 0) {					
  			// get version major and minor
  			var vMajor = Garmin.TcxActivityFactory._tagValue(versionNodes[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.versionMajor);
  			var vMinor = Garmin.TcxActivityFactory._tagValue(versionNodes[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.versionMinor);

  			// get buid major and minor, optional in schema
  			var bMajor = Garmin.TcxActivityFactory._tagValue(versionNodes[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.versionBuildMajor);
  			var bMinor = Garmin.TcxActivityFactory._tagValue(versionNodes[0], Garmin.TcxActivityFactory.SCHEMA_TAGS.versionBuildMinor);

  			// return version
  			if ((bMajor != null) && (bMinor != null)) {
  				return { versionMajor: vMajor, versionMinor: vMinor, buildMajor: bMajor, buildMinor: bMinor };
  			} else {
  				return { versionMajor: vMajor, versionMinor: vMinor };
  			}
  		} else {
  			return null;
  		}
  	},	
  	
  	_tagValue: function(parentNode, tagName) {
  		var subNode = parentNode.getElementsByTagName(tagName);

      // Max and avg heart rates have subnodes named 'Value' with the actual
      // value we want.
  		if (subNode[0] && subNode[0].children.length) {
  		  return this._tagValue(subNode[0], 'Value');
  		}

  		return subNode.length > 0 ? subNode[0].childNodes[0].nodeValue : null;
  	},	
  	
    toString: function() {
      return "[TcxActivityFactory]";
    }
  };

  Garmin.TcxActivityFactory.DETAIL = {
  	creator: 'Garmin Communicator Plugin API - http://www.garmin.com/'
  };
  
  Garmin.TcxActivityFactory.SCHEMA_TAGS = SCHEMA_TAGS;

  return Garmin.TcxActivityFactory;

});
