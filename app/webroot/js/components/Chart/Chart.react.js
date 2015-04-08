/**
 * Chart.react
 *
 * React wrapper around Highcharts API
 */
define([

  'lib/react/react',
  'constants/Highcharts',
  'lib/highcharts/themes/onolog',
  'lib/highcharts/highcharts',
  'lib/jquery/jquery.min'

], function(React, HIGHCHARTS, HighchartsOnologTheme) {

    return React.createClass({
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
          'column'
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
        yAxisTitle: React.PropTypes.string
      },

      getDefaultProps: function() {
        return {
          title: null,
          subtitle: null,
          xAxisTitle: null,
          yAxisTitle: null
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
  
      render: function() {
        return <div />;
      },

      _renderChart: function() {
        $(this.getDOMNode()).highcharts(this._getOptions(this.props));
      },

      _getOptions: function(props) {
        var options = $.extend({
          chart: {
            height: props.height,
            type: props.type
          },
          series: props.series,
          subtitle: {
            text: props.subtitle
          },
          title: {
            text: props.title
          },
          xAxis: {
            categories: props.xAxisCategories,
            title: {
              text: props.xAxisTitle
            }
          },
          yAxis: {
            title: {
              text: props.yAxisTitle
            }
          }
        }, props.options);

        return $.extend(true, // Recursive copy
          HIGHCHARTS.BASE_SETTINGS,
          HighchartsOnologTheme,
          options
        );
      }
    });

});
