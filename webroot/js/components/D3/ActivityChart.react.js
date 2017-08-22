import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import Axis from 'components/D3/Axis.react';
import Chart from 'components/D3/Chart.react';
import Line from 'components/D3/Line.react';
import MouseLine from 'components/D3/MouseLine.react';

import fullWidthChart from 'containers/fullWidthChart';
import {getInnerHeight, getInnerWidth} from 'utils/d3Utils';

class ActivityChart extends React.Component {
  render() {
    const {data, height, style, width} = this.props;

    const innerHeight = getInnerHeight(height, {top: 0});
    const innerWidth = getInnerWidth(width);
    const xMax = d3.max(data, d => d.x);

    const xScale = d3.scaleLinear()
      .rangeRound([0, innerWidth])
      .domain([0, xMax]);

    const yScale = d3.scaleLinear()
      .rangeRound([innerHeight, 0])
      .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)]);

    const mean = d3.mean(data, d => d.y);

    return (
      <Chart height={height} width={width}>
        <Axis
          className="y-axis"
          orient="left"
          scale={yScale}
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
          data={[
            {x: 0, y: mean},
            {x: xMax, y: mean},
          ]}
          style={{
            ...style,
            opacity: 0.3,
            shapeRendering: 'crispEdges',
            strokeDasharray: '4,1',
          }}
          x={d => xScale(d.x)}
          y={d => yScale(d.y)}
        />
        <Line
          data={data}
          style={style}
          x={d => xScale(d.x)}
          y={d => yScale(d.y)}
        />
        <MouseLine
          data={data}
          height={innerHeight}
          width={innerWidth}
        />
      </Chart>
    );
  }
}

ActivityChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number,
  style: PropTypes.object,
  tooltip: PropTypes.func,
  width: PropTypes.number.isRequired,
  yFormat: PropTypes.func,
};

ActivityChart.defaultProps = {
  height: 80,
  style: {},
};

export default fullWidthChart(ActivityChart);
