import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import Area from 'components/D3/Area.react';
import Axis from 'components/D3/Axis.react';
import Chart from 'components/D3/Chart.react';

import fullWidthChart from 'containers/fullWidthChart';
import {getInnerHeight, getInnerWidth, transform} from 'utils/d3Utils';

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
      <Chart height={height} width={width}>
        <Axis
          className="x-axis"
          orient="bottom"
          scale={xScale}
          tickFormat={xFormat}
          transform={transform(0, getInnerHeight(height))}
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
          x={d => xScale(d.xVal)}
          y={d => yScale(d.yVal)}
        />
      </Chart>
    );
  }
}

export default fullWidthChart(AreaChart);
