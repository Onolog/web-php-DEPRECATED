/**
 * GarminMap.react
 * @jsx React.DOM
 *
 * Maps waypoints for a single activity on a Google map
 */
define([

  'lib/react/react',
  'lib/garmin/activity/GarminSeries',
  'lib/garmin/device/GoogleMapController'

], function(

  React,
  GarminSeries,
  GoogleMapController

) {

  return React.createClass({
    displayName: 'GarminMap',

    componentDidMount: function() {
      this.mc = new Garmin.MapController('map');
      this._initTracks();
    },

    componentDidUpdate: function() {
      // If the activity changes, update the map
      this._initTracks();
    },

    propTypes: {
      activity: React.PropTypes.object
    },

    render: function() {
      return <div id="map"></div>;
    },

    _initTracks: function() {
  		var numOfTracks = 0;
  		var activity = this.props.activity;

      // Bail if we don't have a selected activity
  		if (!activity) {
  		  return;
  		}

  		var series = activity.getSeries();

		  // Loop through each series in the activity
		  // TODO: Are there multiple series per activity?
		  // Do we need to validate for different series types or can we assume that
		  // TCX activities will always have tracks?
			for (var ii = 0; ii < series.length; ii++) {
				var curSeries = series[ii];
				switch(curSeries.getSeriesType()) {
					case Garmin.Series.TYPES.history:
						// Activity contains a series of type history, list the track
						numOfTracks++;
						break;
					case Garmin.Series.TYPES.route:
						// Activity contains a series of type route, list the route
						numOfRoutes++;
						break;
					case Garmin.Series.TYPES.waypoint:
						// Activity contains a series of type waypoint, list the waypoint
						numOfWaypoints++;
						break;
					case Garmin.Series.TYPES.course:
						// Activity contains a series of type course, list the coursetrack
						numOfTracks++;
						break;
				}
			}

  		if (numOfTracks > 0) {
  		  this._displayTrack(series[0]);
  		}
    },

    /**
     * Draws a simple line on the map using the Garmin.MapController.
     * @param {Select} index - value of select widget. 
     */
    _displayTrack: function(series) {
      this.mc.clearOverlays();
    	if (series.findNearestValidLocationSample(0, 1)) {
        this.mc.drawTrack(series);
    	}
    }

  });

});
