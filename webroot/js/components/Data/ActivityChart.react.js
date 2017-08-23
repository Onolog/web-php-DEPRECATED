import PropTypes from 'prop-types';
import React from 'react';

import ElevationChart from 'components/Data/ElevationChart.react';
import GoogleMap from 'components/Google/GoogleMap.react';
import VitalsChart from 'components/Data/VitalsChart.react';

import {bisectX} from 'utils/d3Utils';
import secondsToTime from 'utils/secondsToTime';

import './css/ActivityChart.scss';

class ActivityChart extends React.Component {
  state = {
    mouseX: null,
  };

  render() {
    const {elevationData, heartRateData, mapData, paceData} = this.props;
    const {mouseX} = this.state;

    return (
      <div className="activity-chart">
        <div style={{height: '350px', width: '1000px'}}>
          <GoogleMap
            className="activityMap"
            cursorPos={mouseX ? bisectX(mapData, mouseX) : null}
            path={mapData}
          />
        </div>
        <div>
          <ElevationChart
            className="elevation-chart"
            data={elevationData}
            height={150}
            mouseX={mouseX}
            onMouseMove={this._handleMouseMove}
            onMouseOut={this._handleMouseOut}
          />
          <VitalsChart
            className="pace-chart"
            data={paceData}
            invertDomain
            mouseX={mouseX}
            onMouseMove={this._handleMouseMove}
            onMouseOut={this._handleMouseOut}
            yFormat={secondsToTime}
          />
          <VitalsChart
            className="hr-chart"
            data={heartRateData}
            mouseX={mouseX}
            onMouseMove={this._handleMouseMove}
            onMouseOut={this._handleMouseOut}
          />
        </div>
      </div>
    );
  }

  _handleMouseMove = mouseX => {
    this.setState({mouseX});
  }

  _handleMouseOut = e => {
    this.setState({mouseX: null});
  }
}

ActivityChart.propTypes = {
  elevationData: PropTypes.array.isRequired,
  heartRateData: PropTypes.array.isRequired,
  mapData: PropTypes.array.isRequired,
  paceData: PropTypes.array.isRequired,
};

export default ActivityChart;
