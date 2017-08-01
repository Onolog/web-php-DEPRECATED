var PropTypes = require('prop-types');
var React = require('react');
var {Table} = require('react-bootstrap/lib');

var {map} = require('lodash');
var {metersToFeet, metersToMiles} = require('utils/distanceUtils');
var secondsToTime = require('utils/secondsToTime');

/**
 * ActivitySplitsTable.react
 *
 * Displays data for each split/lap in a table view
 */
class ActivitySplitsTable extends React.Component {
  static displayName = 'ActivitySplitsTable';

  static propTypes = {
    laps: PropTypes.array,
  };

  render() {
    return (
      <Table border condensed hover>
        {this._renderHeaderRows()}
        {this._renderBody()}
      </Table>
    );
  }

  _renderHeaderRows = () => {
    var headerCells = map(this._getColumns(), (column, idx) => {
      return <th key={idx}>{column.label}</th>;
    });

    return (
      <thead>
        <tr>
          {headerCells}
        </tr>
      </thead>
    );
  };

  _renderBody = () => {
    var {laps} = this.props;
    if (laps && laps.length) {
      return <tbody>{laps.map(this._renderRows)}</tbody>;
    }

    return (
      <tbody>
        <tr>
          <td colSpan={this._getColumns().length}>
            No splits data available
          </td>
        </tr>
      </tbody>
    );
  };

  _renderRows = (lap, idx) => {
    var cells = map(this._getColumns(), (column, idx) => {
      var value = lap[column.key];
      return (
        <td key={idx}>
          {column.formatter ? column.formatter(value) : value}
        </td>
      );
    });

    return <tr key={idx}>{cells}</tr>;
  };

  _getColumns = () => /*array*/ {
    return [{
      label: 'Lap',
      key: 'lap',
    }, {
      formatter: this._formatDistance,
      label: 'Distance',
      key: 'distance',
    }, {
      formatter: secondsToTime,
      label: 'Duration',
      key: 'duration',
    }, {
      label: 'Avg. HR',
      key: 'avg_hr',
    }, {
      formatter: metersToFeet,
      label: 'Elev (ft)',
      key: 'elevation_change',
    }];
  };

  _formatDistance = (distance) => {
    return metersToMiles(distance) + ' mi';
  };
}

module.exports = ActivitySplitsTable;
