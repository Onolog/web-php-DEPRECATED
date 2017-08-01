var PropTypes = require('prop-types');
var React = require('react');

var Daniels = require('../../constants/Daniels');


function _formatTime(/*number*/ seconds) /*string*/ {
  var timeArray = seconds.toString().split('.');
  var decimal = timeArray[1] === undefined ? '' : '.' + timeArray[1];

  var date = new Date(timeArray[0] * 1000);
  var baseDate = new Date(0);

  var hours = date.getHours() - baseDate.getHours();
  var minutes = date.getMinutes();
  seconds = date.getSeconds();

  var mm = hours && (minutes < 10) ? '0' + minutes : minutes;
  var ss = seconds < 10 ? '0' + seconds : seconds;
  var time = [mm, ss];
  if (hours) {
    time.unshift(hours);
  }

  return time.join(':') + decimal;
}

/**
 * Daniels Distance Tables
 *
 * Displays a table of VDOT values associated with times raced over popular
 * distances.
 */
class DistanceTable extends React.Component {
  static propTypes = {
    vdot: PropTypes.number,
  };

  render() {
    return (
      <div>
        <table className="paces">
          <thead>
            <tr className="header">
              {this._getHeaderCells()}
            </tr>
          </thead>
        </table>
        <div className="scrollContent">
          <table className="paces">
            <tbody>
              {this._getRows()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  _getHeaderCells = () => /*array*/ {
    var distances = Daniels.DISTANCES;
    var headerCells = distances.map(function(distance) {
      return (
        <th key={distance.value}>{distance.label}</th>
      );
    });
    headerCells.push(<th key="vdot-r">VDOT</th>);
    headerCells.unshift(<th key="vdot-l">VDOT</th>);

    return headerCells;
  };

  _getRows = () => /*array*/ {
    var rows = [];
    var vdots = Object.keys(Daniels.PACES);

    vdots.forEach(function(vdot) {
      rows.push(<tr key={vdot}>{this._getCells(vdot)}</tr>);
    }.bind(this));

    return rows;
  };

  _getCells = (/*number*/ vdot) => /*array*/ {
    var cells = [];
    var times = Daniels.TIMES;
    var distances = Object.keys(times);

    distances.forEach(function(distance, idx) {
      cells.push(
        <td key={idx}>
          {_formatTime(times[distance][vdot])}
        </td>
      );
    });

    // Add the vdot value as the first and last cell
    cells.unshift(<td className="vdot" key={vdot + '-l'}>{vdot}</td>);
    cells.push(<td className="vdot" key={vdot + '-r'}>{vdot}</td>);

    return cells;
  };
}

module.exports = DistanceTable;
