import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

import ElevationChart from 'components/Data/ElevationChart.react';
import VitalsChart from 'components/Data/VitalsChart.react';

import secondsToTime from 'utils/secondsToTime';

import './css/ActivityChart.scss';

class ActivityChart extends React.Component {
  state = {
    mouseX: null,
  };

  render() {
    const {elevationData, heartRateData, paceData} = this.props;
    const {mouseX} = this.state;

    return (
      <div className="activity-chart">
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
  paceData: PropTypes.array.isRequired,
};

export default ActivityChart;
