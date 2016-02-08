'use strict';

import Highcharts from 'highcharts-commonjs';
import React from 'react';
import ReactDOM from 'react-dom';

import {merge} from 'lodash';

import HighchartsOnologTheme from 'lib/highcharts/themes/onolog';
import HIGHCHARTS from 'constants/Highcharts';

/**
 * Chart.react
 *
 * React wrapper around Highcharts API
 */
const Chart = React.createClass({
  displayName: 'Chart',

  propTypes: {
    /**
     * Optional JSON object of options.
     * See: http://api.highcharts.com/highcharts
     */
    options: React.PropTypes.object,
    /**
     * The type of chart to be rendered.
     */
    type: React.PropTypes.oneOf([
      'area',
      'bar',
      'column',
    ]).isRequired,
    /**
     * Title for the chart.
     */
    title: React.PropTypes.string,
    /**
     * Subtitle for the chart.
     */
    subtitle: React.PropTypes.string,
    /**
     * Data series to be displayed.
     */
    series: React.PropTypes.array.isRequired,
    xAxisCategories: React.PropTypes.array,
    /**
     * Title for the x-axis.
     */
    xAxisTitle: React.PropTypes.string,
    yAxisTitle: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      title: null,
      subtitle: null,
      xAxisTitle: null,
      yAxisTitle: null,
    };
  },

  componentDidMount: function() {
    this._renderChart();
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // Return false to block React from re-rendering
    return !!(nextProps.series && nextProps.series.length);
  },

  componentDidUpdate: function(/*object*/ prevProps, /*object*/ prevState) {
    this._renderChart();
    return false;
  },

  componentWillUnmount: function() {
    Highcharts.destroy();
  },

  render: function() {
    return <div />;
  },

  _renderChart: function() {
    Highcharts.createChart(
      ReactDOM.findDOMNode(this),
      this._getOptions(this.props)
    );
  },

  _getOptions: function({
    height,
    options,
    series,
    subtitle,
    title,
    type,
    xAxisCategories,
    xAxisTitle,
    yAxisTitle,
  }) {
    var mergedOptions = merge({
      chart: {height, type},
      series: series,
      subtitle: {
        text: subtitle,
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: xAxisCategories,
        title: {
          text: xAxisTitle,
        },
      },
      yAxis: {
        title: {
          text: yAxisTitle,
        },
      },
    }, options);

    return merge(
      HIGHCHARTS.BASE_SETTINGS,
      HighchartsOnologTheme,
      mergedOptions
    );
  },
});

module.exports = Chart;
