import cx from 'classnames';
import d3 from 'd3';
import moment from 'moment';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import Axis from 'components/D3/Axis.react';
import Bar from 'components/D3/Bar.react';

require('../../app/Pages/chart.css');

const MARGIN = {
  bottom: 30,
  left: 40,
  right: 30,
  top: 20,
};

const getInnerHeight = height => height - MARGIN.top - MARGIN.bottom;
const getInnerWidth = width => width - MARGIN.left - MARGIN.right;

const xScale = (data, width) => {
  return d3.scale.ordinal()
    .domain(data.map(d => d.xVal))
    .rangeRoundBands([0, getInnerWidth(width)], .1);
};

const yScale = (data, height) => {
  return d3.scale.linear()
    .domain([0, d3.max(data, d => d.yVal)])
    .range([getInnerHeight(height), 0]);
};


const BarChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    tooltip: PropTypes.func,
    width: PropTypes.number,
    xFormat: PropTypes.func,
  },

  getInitialState() {
    return {
      width: this.props.width || 400,
    };
  },

  componentDidMount() {
    this._setWidth();
    window.addEventListener('resize', this._setWidth);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._setWidth);
  },

  render() {
    const {data, height, xFormat} = this.props;
    const {width} = this.state;

    return (
      <svg
        height={height}
        width={width}>
        <g
          className="chart"
          transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <Axis
            className="x-axis"
            orient="bottom"
            scale={xScale(data, width)}
            tickFormat={xFormat}
            transform={`translate(0, ${getInnerHeight(height)})`}
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
          <g className="bars">
            {data.map(this._renderBar)}
          </g>
        </g>
      </svg>
    );
  },

  _renderBar(d, idx) {
    const {data, height, tooltip} = this.props;
    const {width} = this.state;
    const x = xScale(data, width);
    const y = yScale(data, height);

    return (
      <Bar
        data={d}
        key={idx}
        height={getInnerHeight(height) - y(d.yVal)}
        tooltip={tooltip && tooltip(d)}
        width={getInnerWidth(width) / data.length - 2}
        x={x(d.xVal)}
        y={y(d.yVal)}
      />
    );
  },

  _setWidth() {
    const width = findDOMNode(this).parentNode.offsetWidth;
    this.setState({width});
  },
});

export default BarChart;
