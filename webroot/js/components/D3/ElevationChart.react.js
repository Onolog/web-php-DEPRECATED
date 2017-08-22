import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import Area from 'components/D3/Area.react';
import Axis from 'components/D3/Axis.react';
import Chart from 'components/D3/Chart.react';
import MouseLine from 'components/D3/MouseLine.react';

import fullWidthChart from 'containers/fullWidthChart';
import {getInnerHeight, getInnerWidth, transform} from 'utils/d3Utils';

const Y_TICKS = 3;

class ElevationChart extends React.Component {
  render() {
    const {data, height, width} = this.props;

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, getInnerWidth(width)]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
      .range([getInnerHeight(height), 0]);

    return (
      <Chart height={height} width={width}>
        <Axis
          className="x-axis"
          orient="bottom"
          scale={xScale}
          tickFormat={d => `${d.toFixed(1)} mi`}
          transform={transform(0, getInnerHeight(height))}
        />
        <Axis
          className="y-axis"
          orient="left"
          scale={yScale}
          tickFormat={d => `${d} ft`}
          ticks={Y_TICKS}
        />
        <Axis
          className="y-axis-background"
          orient="right"
          scale={yScale}
          ticks={Y_TICKS}
          tickSize={getInnerWidth(width)}
        />
        <Area
          data={data}
          height={height}
          style={{
            fill: 'rgba(0, 0, 0, 0.15)',
          }}
          x={d => xScale(d.x)}
          y={d => yScale(d.y)}
        />
        <MouseLine
          data={data}
          height={getInnerHeight(height)}
          width={getInnerWidth(width)}
        />
      </Chart>
    );
  }
}

ElevationChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  tooltip: PropTypes.func,
  width: PropTypes.number.isRequired,
};

export default fullWidthChart(ElevationChart);
