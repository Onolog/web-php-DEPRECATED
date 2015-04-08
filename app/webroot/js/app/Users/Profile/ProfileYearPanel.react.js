/**
 * ProfileYearPanel.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',

  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/Chart/Chart.react',
  'lib/react/jsx!components/Data/LabeledStat.react',
  'lib/react/jsx!components/Data/Topline.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'utils/DateTimeUtils',
  'utils/formatDistance'

], function(

  React,

  Button,
  ButtonGroup,
  Chart,
  LabeledStat,
  Topline,
  Panel,

  DateTimeUtils,
  formatDistance

) {

  function _getOptions(year, interval) {
    return {
      plotOptions: {
        series: {
          pointStart: Date.UTC(year, 0, 1),
          pointInterval: interval
        }
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%b'
        },
      }
    }
  }

  var DAY_IN_MS = 24 * 60 * 60 * 1000;
  var WEEK_IN_MS = 7 * DAY_IN_MS;
  var MONTH_IN_MS = (DAY_IN_MS * 365) / 12;

  var GRAPH_HEIGHT = 200;
  var GRAPH_TYPE = 'column';

  var DAILY = 'daily';
  var MONTHLY = 'monthly';
  var WEEKLY = 'weekly';

  return React.createClass({
    displayName: 'ProfileYearPanel',

    propTypes: {
      months: React.PropTypes.object,
      title: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
      weeks: React.PropTypes.object
    },

    getInitialState: function() {
      return {
        selectedGraph: DAILY
      };
    },

    render: function() {
      return (
        <Panel
          actions={this._renderActions()}
          className="profileYear"
          title={this.props.title}>
          {this._renderDailyGraph()}
          {this._renderWeeklyGraph()}
          {this._renderMonthlyGraph()}
        </Panel>
      );
    },

    _renderActions: function() {
      return null;

      var selectedGraph = this.state.selectedGraph;
      return (
        <ButtonGroup size="small">
          <Button
            depressed={selectedGraph === DAILY}
            label="Daily"
            onClick={this._onClick}
          />
          <Button
            depressed={selectedGraph === WEEKLY}
            label="Weekly"
            onClick={this._onClick}
          />
          <Button
            depressed={selectedGraph === MONTHLY}
            label="Monthly"
            onClick={this._onClick}
          />
        </ButtonGroup>
      );
    },

    _renderDailyGraph: function() {
      if (this.state.selectedGraph !== DAILY) {
        return null;      
      }

      var monthData = this.props.months;
      var monthKeys = Object.keys(monthData);
      var data = [];
      var year;

      monthKeys.forEach(function(monthKey) {
        var month = monthData[monthKey];
        year = month.year;

        var dayKeys = Object.keys(month.days);
        var days = month.days;
        dayKeys.forEach(function(dayKey) {
          var day = days[dayKey];
          data.push(day.miles);
        });
      });

      return (
        <Chart
          key={GRAPH_TYPE}
          height={GRAPH_HEIGHT}
          series={[{data: data}]}
          type={GRAPH_TYPE}
          options={_getOptions(year, DAY_IN_MS)}
        />
      );
    },

    _renderWeeklyGraph: function() {
      if (this.state.selectedGraph !== WEEKLY) {
        return null;      
      }

      var weekData = this.props.weeks;
      var keys = Object.keys(weekData).sort();
      var data = [];
      var year;

      keys.forEach(function(key) {
        var week = weekData[key];
        year = week.year;
        data.push(week.miles);
      });

      return (
        <Chart
          key={GRAPH_TYPE}
          height={GRAPH_HEIGHT}
          series={[{data: data}]}
          type={GRAPH_TYPE}
          options={_getOptions(year, WEEK_IN_MS)}
        />
      );
    },

    _renderMonthlyGraph: function() {
      if (this.state.selectedGraph !== MONTHLY) {
        return null;      
      }

      var monthData = this.props.months;
      var keys = Object.keys(monthData);
      var data = [];

      keys.forEach(function(key) {
        var month = monthData[key];
        year = month.year;
        data.push(month.miles);
      });

      return (
        <Chart
          key={GRAPH_TYPE}
          height={GRAPH_HEIGHT}
          series={[{data: data}]}
          type={GRAPH_TYPE}
          options={_getOptions(year, MONTH_IN_MS)}
        />
      );
    },

    _onClick: function(event) {
      this.setState({
        selectedGraph: event.target.innerText.toLowerCase()
      });
    }

  });

});
