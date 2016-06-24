var GoogleMapsLoader = require('google-maps');
var React = require('react');
var ReactDOM = require('react-dom');

var GarminSeries = require('lib/garmin/activity/GarminSeries');
var GoogleMapController = require('lib/garmin/device/GoogleMapController');

/**
 * ActivityMap.react
 *
 * Maps waypoints for a single activity on a Google map
 */
var ActivityMap = React.createClass({
  displayName: 'ActivityMap',

  componentDidMount: function() {
    GoogleMapsLoader.load((google) => {
      // TODO: Get rid of Garmin lib?
      this.mc = new GoogleMapController(ReactDOM.findDOMNode(this));
      this._initTracks();
    });
  },

  propTypes: {
    series: React.PropTypes.array,
  },

  render: function() {
    return <div className={this.props.className} />;
  },

  _initTracks: function() {
    var numOfRoutes = 0;
    var numOfTracks = 0;
    var numOfWaypoints = 0;
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
  },
});

module.exports = ActivityMap;
