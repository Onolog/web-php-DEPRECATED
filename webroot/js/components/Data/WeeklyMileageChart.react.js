import * as d3 from 'd3';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';

import Axis from 'components/D3/Axis.react';
import {Bar, Bars} from 'components/D3/Bar.react';
import Chart from 'components/D3/Chart.react';

import d3Tooltip from 'containers/d3Tooltip';
import fullWidthChart from 'containers/fullWidthChart';

import formatDistance from 'utils/formatDistance';
import {getInnerHeight, getInnerWidth, transform} from 'utils/d3Utils';

const TooltipBar = d3Tooltip(Bar);

class WeeklyMileageChart extends React.Component {

  render() {
    const {data, height, width, year} = this.props;

    const innerHeight = getInnerHeight(height);
    const innerWidth = getInnerWidth(width);

    const m = moment(new Date(year, 0 , 1));
    const xScale = d3.scaleTime()
      .domain([
        m.week(1).day(0).toDate(),
        m.week(m.weeksInYear() + 1).day(6).toDate(),
      ])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([getInnerHeight(height), 0]);

    return (
      <Chart height={height} width={width}>
        <Axis
          className="x-axis"
          orient="bottom"
          scale={xScale}
          ticks={12}
          tickFormat={date => moment(date).format('MMM')}
          transform={transform(0, innerHeight)}
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
          tickSize={innerWidth}
        />
        <Bars>
          {data.map(d => this._renderBar(d, xScale, yScale))}
        </Bars>
      </Chart>
    );
  }

  _renderBar = (d, xScale, yScale) => {
    const {height, width, year} = this.props;

    // First day of the nth week for the given year.
    const m = moment().year(year).week(d.key).day(0);
    const weeksInYear = m.weeksInYear();

    const tooltip = `
      ${m.format('MMM D')} &ndash; ${m.add(6, 'days').format('MMM D')}
      <div>${formatDistance(d.value)} miles</div>
    `;

    return (
      <TooltipBar
        data={d}
        height={getInnerHeight(height) - yScale(d.value)}
        key={d.key}
        tooltip={tooltip}
        width={getInnerWidth(width) / weeksInYear - 2}
        x={xScale(m.toDate()) - 22}
        y={yScale(d.value)}
      />
    );
  };
}

WeeklyMileageChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
};

export default fullWidthChart(WeeklyMileageChart);