import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import Axis from 'components/D3/Axis.react';
import Chart from 'components/D3/Chart.react';
import {Dot, Dots} from 'components/D3/Dot.react';
import Line from 'components/D3/Line.react';

import d3Tooltip from 'containers/d3Tooltip';
import fullWidthChart from 'containers/fullWidthChart';
import {getInnerHeight, getInnerWidth, transform} from 'utils/d3Utils';

const TooltipDot = d3Tooltip(Dot);

const xScale = (data, width) => {
  return d3.scaleBand()
    .rangeRound([0, getInnerWidth(width)])
    .domain(data.map(d => d.xVal));
};

const yScale = (data, height) => {
  return d3.scaleLinear()
    .rangeRound([getInnerHeight(height), 0])
    .domain([0, d3.max(data, d => d.yVal)]);
};

class LineChart extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.func,
    width: PropTypes.number.isRequired,
    xFormat: PropTypes.func,
  }

  render() {
    const {data, height, width, xFormat} = this.props;

    return (
      <Chart height={height} width={width}>
        <Axis
          className="x-axis"
          orient="bottom"
          scale={xScale(data, width)}
          tickFormat={xFormat}
          transform={transform(0, getInnerHeight(height))}
        />
        <Axis
          className="y-axis"
          orient="left"
          scale={yScale(data, height)}
        />
        <Axis
          className="y-axis-background"
          orient="right"
          scale={yScale(data, height)}
          tickSize={getInnerWidth(width)}
        />
        <Line
          data={data}
          x={d => xScale(data, width)(d.xVal)}
          y={d => yScale(data, height)(d.yVal)}
        />
        {this._renderDots()}
      </Chart>
    );
  }

  _renderDots = () => {
    const {data, dots} = this.props;

    if (dots) {
      return (
        <Dots>
          {data.map(this._renderDot)}
        </Dots>
      );
    }
  }

  _renderDot = (d, idx) => {
    const {data, height, tooltip, width} = this.props;
    const x = xScale(data, width);
    const y = yScale(data, height);

    return (
      <TooltipDot
        key={idx}
        radius={5}
        tooltip={tooltip && tooltip(d)}
        x={x(d.xVal)}
        y={y(d.yVal)}
      />
    );
  }
}

export default fullWidthChart(LineChart);
