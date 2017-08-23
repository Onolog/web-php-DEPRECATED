import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import Axis from 'components/D3/Axis.react';
import {Bar, Bars} from 'components/D3/Bar.react';
import Chart from 'components/D3/Chart.react';

import d3Tooltip from 'containers/d3Tooltip';
import fullWidthChart from 'containers/fullWidthChart';
import {getInnerHeight, getInnerWidth, transform} from 'utils/d3Utils';

const TooltipBar = d3Tooltip(Bar);

const xScale = (data, width) => {
  return d3.scaleBand()
    .rangeRound([0, getInnerWidth(width)])
    .padding(0.1)
    .domain(data.map(d => d.xVal));
};

const yScale = (data, height) => {
  return d3.scaleLinear()
    .rangeRound([getInnerHeight(height), 0])
    .domain([0, d3.max(data, d => d.yVal)]);
};

class BarChart extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.func,
    width: PropTypes.number,
    xFormat: PropTypes.func,
  };

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
        <Bars>
          {data.map(this._renderBar)}
        </Bars>
      </Chart>
    );
  }

  _renderBar = (d, idx) => {
    const {data, height, tooltip, width} = this.props;
    const x = xScale(data, width);
    const y = yScale(data, height);

    return (
      <TooltipBar
        data={d}
        height={getInnerHeight(height) - y(d.yVal)}
        key={idx}
        tooltip={tooltip && tooltip(d)}
        width={getInnerWidth(width) / data.length - 2}
        x={x(d.xVal)}
        y={y(d.yVal)}
      />
    );
  };
}

export default fullWidthChart(BarChart);
