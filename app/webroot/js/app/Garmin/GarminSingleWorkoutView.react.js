/**
 * GarminSingleWorkoutView.react
 * @jsx React.DOM
 *
 * Parses and displays a single workout from a Garmin device
 */
define([

  'lib/react/react',

  'lib/react/jsx!components/Data/DataGroup.react',
  'lib/react/jsx!components/Data/DataRow.react',

  'lib/garmin/device/GoogleMapController',

], function(
    React,
    DataGroup,
    DataRow
  ) {

  return React.createClass({
    displayName: 'GarminSingleWorkoutView',

    propTypes: {
      activity: React.PropTypes.object.isRequired
    },

    componentDidMount: function() {
      this.map = new Garmin.MapController('map');
    },

    render: function() {
      // Break early if it's an empty object
      var activity = this.props.activity;
      /*
      if (!Object.getOwnPropertyNames(activity).length) {
        return <div/>;
      }
      */

      var name =
        activity.getAttribute && activity.getAttribute('activityName');

      return (
        <DataGroup display="horizontal">
          <DataRow label="Tracks">
          	<select
              className="form-control"
              name="readTracksSelect"
              id="readTracksSelect"
              disabled={!name}>
          		<option value="-1">No Tracks Found</option>
          		<option value={name}>{name}</option>
          	</select>
          </DataRow>
          <DataRow label="Map">
            <div id="map"></div>
          </DataRow>
          <DataRow label="Splits">
            Splits table goes here
          </DataRow>
          <DataRow label="Raw Workout String">
          	<textarea
              name="dataString"
              id="dataString"
              className="form-control"
              rows="10"
              value=""
            />
          </DataRow>
        </DataGroup>
      );
    }

  });

});
