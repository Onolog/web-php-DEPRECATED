/**
 * ActivityMap.react
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
    displayName: 'ActivityMap',

    componentDidMount: function() {
      this.mc = new GoogleMapController(this.getDOMNode());
      this._initTracks();
    },

    componentDidUpdate: function() {
      // If the activity changes, update the map
      this._initTracks();
    },

    propTypes: {
      series: React.PropTypes.array
    },

    render: function() {
      return <div className={this.props.className} />;
    },

    _initTracks: function() {
  		var numOfTracks = 0;
  		var series = this.props.series;

		  // Loop through each series in the activity
		  // TODO: Are there multiple series per activity?
		  // Do we need to validate for different series types or can we assume that
		  // TCX activities will always have tracks?
			for (var ii = 0; ii < series.length; ii++) {
				var curSeries = series[ii];
				switch(curSeries.getSeriesType()) {
					case GarminSeries.TYPES.history:
						// Activity contains a series of type history, list the track
						numOfTracks++;
						break;
					case GarminSeries.TYPES.route:
						// Activity contains a series of type route, list the route
						numOfRoutes++;
						break;
					case GarminSeries.TYPES.waypoint:
						// Activity contains a series of type waypoint, list the waypoint
						numOfWaypoints++;
						break;
					case GarminSeries.TYPES.course:
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
