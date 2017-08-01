var PropTypes = require('prop-types');
var React = require('react');

var Daniels = require('../../constants/Daniels');

function _formatTime(/*number*/ seconds) /*string|number*/ {
  // For paces under 100 seconds, just show as seconds
  if (seconds < 100) {
    return seconds;
  }
  var time = new Date(seconds * 1000);
  seconds = time.getSeconds();
  var ss = seconds < 10 ? '0' + seconds : seconds;
  return time.getMinutes() + ':' + ss;
}

var PaceTable = React.createClass({

  propTypes: {
    vdot: PropTypes.number,
  },

  render: function() {
    return (
      <div>
        <table className="paces">
          <thead>
            <tr className="header">
              <th rowSpan="2">VDOT</th>
              <th>E Pace</th>
              <th>M Pace</th>
              <th colSpan="3">T Pace</th>
              <th colSpan="4">I Pace</th>
              <th className="lastCol" colSpan="3">R Pace</th>
              <th rowSpan="2">VDOT</th>
            </tr>
            <tr className="distance">
              <th className="lastCol">Mile</th>
              <th className="lastCol">Mile</th>
              <th>400m</th>
              <th>1000m</th>
              <th className="lastCol">Mile</th>
              <th>400m</th>
              <th>1000m</th>
              <th>1200m</th>
              <th className="lastCol">Mile</th>
              <th>200m</th>
              <th>400m</th>
              <th>800m</th>
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
  },

  _getRows: function() {
    var rows = [];
    var vdots = this.props.vdot ?
      [this.props.vdot] : Object.keys(Daniels.PACES);

    vdots.forEach(function(vdot) {
      rows.push(<tr key={vdot}>{this._getCells(vdot)}</tr>);
    }.bind(this));

    return rows;
  },

  _getCells: function(vdot) {
    var cells = [];
    var paces = Daniels.PACES[vdot];

    for (var intensity in paces) {
      if (!paces.hasOwnProperty(intensity)) {
        continue;
      }

      for (var distance in paces[intensity]) {
        if (!paces[intensity].hasOwnProperty(distance)) {
          continue;
        }

        var key = vdot + '.' + intensity + '.' + distance;
        var seconds = paces[intensity][distance];
        var value = seconds ? _formatTime(seconds) : '·';

        cells.push(<td key={key}>{value}</td>);
      }
    }

    // Add the vdot value as the first and last cell
    cells.unshift(<td className="vdot" key={vdot + '-l'}>{vdot}</td>);
    cells.push(<td className="vdot" key={vdot + '-r'}>{vdot}</td>);

    return cells;
  },
});

module.exports = PaceTable;
