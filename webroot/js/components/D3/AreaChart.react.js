import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import Area from 'components/D3/Area.react';
import Axis from 'components/D3/Axis.react';
import Chart from 'components/D3/Chart.react';

import fullWidthChart from 'containers/fullWidthChart';

const MARGIN = {
  bottom: 30,
  left: 40,
  right: 30,
  top: 20,
};

const getInnerHeight = height => height - MARGIN.top - MARGIN.bottom;
const getInnerWidth = width => width - MARGIN.left - MARGIN.right;

class AreaChart extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.func,
    width: PropTypes.number.isRequired,
    xFormat: PropTypes.func,
  }

  render() {
    const {data, height, width, xFormat} = this.props;

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.xVal))
      .rangeRound([0, getInnerWidth(width)]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.yVal)])
      .rangeRound([getInnerHeight(height), 0]);

    return (
      <Chart
        height={height}
        transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        width={width}>
        <Axis
          className="x-axis"
          orient="bottom"
          scale={xScale}
          tickFormat={xFormat}
          transform={`translate(0, ${getInnerHeight(height)})`}
        />
        <Axis
          className="y-axis"
          orient="left"
          scale={yScale}
        />
        <Axis
          className="y-axis-background"
          orient="right"
          scale={yScale}
          tickSize={getInnerWidth(width)}
        />
        <Area
          data={data}
          height={height}
          width={width}
          xScale={xScale}
          yScale={yScale}
        />
      </Chart>
    );
  }
}

export default fullWidthChart(AreaChart);
