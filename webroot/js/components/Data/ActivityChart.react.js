import PropTypes from 'prop-types';
import React from 'react';

import ElevationChart from 'components/Data/ElevationChart.react';
import GoogleMap from 'components/Google/GoogleMap.react';
import VitalsChart from 'components/Data/VitalsChart.react';

import {bisect} from 'utils/d3Utils';
import secondsToTime from 'utils/secondsToTime';

import './css/ActivityChart.scss';

class ActivityChart extends React.Component {
  state = {
    mouseX: null,
  };

  render() {
    const {data} = this.props;
    const {mousePos} = this.state;

    return (
      <div className="activity-chart">
        <div style={{height: '350px', width: '1000px'}}>
          <GoogleMap
            className="activityMap"
            cursorPos={mousePos}
            path={data}
          />
        </div>
        <div>
          <ElevationChart
            className="elevation-chart"
            data={data}
            height={150}
            mousePos={mousePos}
            onMouseMove={this._handleMouseMove}
            onMouseOut={this._handleMouseOut}
          />
          <VitalsChart
            className="pace-chart"
            data={data}
            invert
            metric="pace"
            mousePos={mousePos}
            onMouseMove={this._handleMouseMove}
            onMouseOut={this._handleMouseOut}
            yFormat={secondsToTime}
          />
          <VitalsChart
            className="hr-chart"
            data={data}
            metric="hr"
            mousePos={mousePos}
            onMouseMove={this._handleMouseMove}
            onMouseOut={this._handleMouseOut}
            yFormat={y => y}
          />
        </div>
      </div>
    );
  }

  _handleMouseMove = mouseX => {
    const mousePos = bisect(this.props.data, mouseX, d => d.distance);
    this.setState({mousePos});
  }

  _handleMouseOut = e => {
    this.setState({mousePos: null});
  }
}

ActivityChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    distance: PropTypes.number.isRequired,
    hr: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    pace: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default ActivityChart;
