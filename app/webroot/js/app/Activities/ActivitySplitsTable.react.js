var React = require('react');

var Table = require('../../components/Table/Table.react');

var TcxActivityFactory = require('../../lib/garmin/activity/TcxActivityFactory');
var distanceUtils = require('../../utils/distanceUtils');
var secondsToTime = require('../../utils/secondsToTime');

var SCHEMA_TAGS = TcxActivityFactory.SCHEMA_TAGS;

/**
 * ActivitySplitsTable.react
 * @jsx React.DOM
 *
 * Displays data for each split/lap in a table view
 */
var ActivitySplitsTable = React.createClass({
  displayName: 'ActivitySplitsTable',

  propTypes: {
    laps: React.PropTypes.array
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
    var laps = this.props.laps;
    var contents;
    var columns = this._getColumns();

    if (!laps || !laps.length) {
      contents =
        <tr>
          <td colSpan={columns.length}>
            No splits data available
          </td>
        </tr>;
    } else {
      contents = laps.map(function(lap, idx) {
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

    return <tbody>{contents}</tbody>;
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
      formatter: secondsToTime,
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
  }
});

module.exports = ActivitySplitsTable;
