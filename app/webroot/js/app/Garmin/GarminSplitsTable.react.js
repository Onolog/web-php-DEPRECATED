/**
 * GarminSplitsTable.react
 * @jsx React.DOM
 *
 * Displays data for each split/lap in a table view
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Table/Table.react',
  'lib/garmin/activity/TcxActivityFactory',
  'utils/DateTimeUtils',
  'utils/distanceUtils'

], function(

  React,
  Table,
  TcxActivityFactory,
  DateTimeUtils,
  distanceUtils

) {

  var SCHEMA_TAGS = Garmin.TcxActivityFactory.SCHEMA_TAGS;

  return React.createClass({
    displayName: 'GarminSplitsTable',

    propTypes: {
      activity: React.PropTypes.object
    },

    render: function() {
      return (
        <Table condensed={true} border={true} hover={true}>
          {this._renderHeaderRows()}
          {this._renderBodyRows()}
        </Table>
      );
    },

    _renderHeaderRows: function() {
      var headerCells = this._getColumns().map(function(column, idx) {
        return <th key={idx}>{column.label}</th>;
      });

      return (
        <thead>
          <tr>
            {headerCells}
          </tr>
        </thead>
      );
    },

    _renderBodyRows: function() {
      var activity = this.props.activity;
      var laps;
      var columns = this._getColumns();

      if (!activity) {
        laps =
          <tr>
            <td colSpan={columns.length}>
              No splits data available
            </td>
          </tr>;
      } else {
        laps = activity.getLaps().map(function(lap, idx) {
          var cells = columns.map(function(column, idx) {
            var value = lap[column.tag];
            return (
              <td key={idx}>
                {column.formatter ? column.formatter(value) : value}
              </td>
            );
          });

          return (
            <tr key={idx}>{cells}</tr>
          );
        });
      }

      return <tbody>{laps}</tbody>;
    },

    _getColumns: function() /*array*/ {
      return [{
        label: 'Lap',
        tag: SCHEMA_TAGS.lap
      }, {
        formatter: this._formatDistance,
        label: 'Distance',
        tag: SCHEMA_TAGS.lapDistance
      }, {
        formatter: this._formatTime,
        label: 'Time',
        tag: SCHEMA_TAGS.lapTotalTime
      }, {
        label: 'Avg. HR',
        tag: SCHEMA_TAGS.lapAverageHeartRate
      }, {
        formatter: this._formatElevation,
        label: 'Elev (ft)',
        tag: SCHEMA_TAGS.lapElevationChange
      }];
    },

    _formatDistance: function(distance) {
      return distanceUtils.metersToMiles(distance) + ' mi';
    },

    _formatElevation: function(elevationChange) {
      return distanceUtils.metersToFeet(elevationChange);
    },

    _formatTime: function(time) {
      return DateTimeUtils.secondsToTime(time);
    }    

  });

});
