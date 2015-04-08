/**
 * Basic highcharts theme for Onolog
 */

var BACKGROUND_COLOR = '#f9f9f9';
var BORDER_COLOR = '#e9e9e9';
var COLOR_WHITE = '#fff';
var FONT_FAMILY = '"Helvetica Neue", Helvetica, Arial, sans-serif';
var TEXT_COLOR = '#333';

define({
  colors: [
    '#95b7cf'
  ],
  /**
   * Styles for rendering the chart legend
   */
  legend: {
    align: 'right',
    backgroundColor: COLOR_WHITE,
    borderWidth: 1,
    shadow: false,
    style: {
      'font-family': FONT_FAMILY
    },
    verticalAlign: 'top'
  },
  plotOptions: {
    area: {
      lineWidth: 1,
    },
    column: {
      borderWidth: 1,
      groupPadding: 0,
      pointPadding: 0
    }
  },
  subtitle: {
    align: 'left',
    style: {
      'font-family': FONT_FAMILY
    }
  },
  title: {
    align: 'left',
    style: {
      'font-family': FONT_FAMILY
    }
  },
  /**
   * Options for how to render tooltips
   */
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 8, // Match Bootstrap tooltips
    borderWidth: 0,
    hideDelay: 250,
    pointFormat: '<div>{point.y}</div>',
    shadow: false,
    style: {
      'font-family': FONT_FAMILY,
      color: COLOR_WHITE
    },
    useHTML: true,
    valueSuffix: ' miles'
  },
  xAxis: {
    gridLineColor: BORDER_COLOR,
    labels: {
      align: 'left',
      color: '#aaa',
      style: {
        'font-family': FONT_FAMILY
      },
      x: 5,
      y: 15
    },
    lineColor: BORDER_COLOR,
    tickColor: BORDER_COLOR,
    tickLength: 20
  },
  yAxis: {
    alternateGridColor: BACKGROUND_COLOR,
    gridLineColor: BORDER_COLOR,
    labels: {
      style: {
        color: '#aaa',
        'font-family': FONT_FAMILY,
        'font-size': '10px'
      },
      x: -5,
    },
    lineColor: BORDER_COLOR,
    maxPadding: 0.1,
    tickColor: BORDER_COLOR
  }
});
