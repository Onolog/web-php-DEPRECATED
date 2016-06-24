/**
 * Highcharts.js
 */
module.exports = {
  /**
   * Settings for rendering highchart graphs
   */
  BASE_SETTINGS: {
    /**
     * Option to display a link to highcharts.com at the bottom of the graph
     */
    credits: {
      enabled: false,
    },
    /**
     * Styles for rendering the chart legend
     */
    legend: {
      // Disable the legend by default
      enabled: false,
      floating: true,
      layout: 'vertical',
      x: -40,
      y: 100,
    },
    /**
     *
     */
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    yAxis: {
      labels: {
        overflow: 'justify',
      },
      /**
       * Minimum value at which to start the y-axis
       */
      min: 0,
      title: {
        /**
         * Vertical alignment of y-axis title. Valid values are:
         *  - 'low'
         *  - 'middle' (default)
         *  - 'high'
         */
        align: 'middle',
      },
    },
  },
};