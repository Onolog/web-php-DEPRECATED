import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import Area from 'components/D3/Area.react';
import Axis from 'components/D3/Axis.react';
import Chart from 'components/D3/Chart.react';
import MouseIndicator from 'components/D3/MouseIndicator.react';

import fullWidthChart from 'containers/fullWidthChart';
import {getInnerHeight, getInnerWidth, transform} from 'utils/d3Utils';

const Y_TICKS = 3;

class ElevationChart extends React.Component {
  render() {
    const {className, data, height, width, ...otherProps} = this.props;

    const innerHeight = getInnerHeight(height);
    const innerWidth = getInnerWidth(width);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
      .range([innerHeight, 0]);

    const yFormat = elevation => `${elevation} ft`;

    return (
      <Chart
        className={className}
        height={height}
        width={width}>
        <Axis
          className="x-axis"
          orient="bottom"
          scale={xScale}
          tickFormat={d => `${d.toFixed(1)} mi`}
          transform={transform(0, innerHeight)}
        />
        <Axis
          className="y-axis"
          orient="left"
          scale={yScale}
          tickFormat={yFormat}
          ticks={Y_TICKS}
        />
        <Axis
          className="y-axis-background"
          orient="right"
          scale={yScale}
          ticks={Y_TICKS}
          tickSize={innerWidth}
        />
        <Area
          data={data}
          height={height}
          x={d => xScale(d.x)}
          y={d => yScale(d.y)}
        />
        <MouseIndicator
          {...otherProps}
          data={data}
          height={innerHeight}
          width={innerWidth}
          xScale={xScale}
          yFormat={yFormat}
          yScale={yScale}
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
