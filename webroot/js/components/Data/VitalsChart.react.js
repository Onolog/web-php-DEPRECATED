import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import Axis from 'components/D3/Axis.react';
import Chart from 'components/D3/Chart.react';
import Line from 'components/D3/Line.react';
import MouseLine from 'components/D3/MouseLine.react';

import fullWidthChart from 'containers/fullWidthChart';
import {getInnerHeight, getInnerWidth} from 'utils/d3Utils';

class VitalsChart extends React.Component {
  render() {
    const {
      className,
      data,
      height,
      invertDomain,
      style,
      width,
      yFormat,
      ...otherProps,
    } = this.props;

    const innerHeight = getInnerHeight(height, {top: 0});
    const innerWidth = getInnerWidth(width);

    const xMax = d3.max(data, d => d.x);
    const xScale = d3.scaleLinear()
      .domain([0, xMax])
      .range([0, innerWidth]);

    const yMax = d3.max(data, d => d.y);
    const yMin = d3.min(data, d => d.y);
    const yDomain = invertDomain ? [yMax, yMin] : [yMin, yMax];

    const yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([innerHeight, 0]);

    const mean = d3.mean(data, d => d.y);

    return (
      <Chart
        className={className}
        height={height}
        width={width}>
        <Axis
          className="y-axis"
          orient="left"
          scale={yScale}
          tickFormat={yFormat}
          ticks={2}
        />
        <Axis
          className="y-axis-background"
          orient="right"
          scale={yScale}
          ticks={2}
          tickSize={innerWidth}
        />
        <Line
          className="mean-line"
          data={[
            {x: 0, y: mean},
            {x: xMax, y: mean},
          ]}
          x={d => xScale(d.x)}
          y={d => yScale(d.y)}
        />
        <Line
          data={data}
          x={d => xScale(d.x)}
          y={d => yScale(d.y)}
        />
        <MouseLine
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

VitalsChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  invertDomain: PropTypes.bool,
  tooltip: PropTypes.func,
  width: PropTypes.number.isRequired,
  yFormat: PropTypes.func,
};

VitalsChart.defaultProps = {
  height: 80,
  invertDomain: false,
};

export default fullWidthChart(VitalsChart);
