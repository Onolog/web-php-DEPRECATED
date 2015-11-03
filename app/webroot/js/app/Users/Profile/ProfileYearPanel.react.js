var _ = require('underscore');
var moment = require('moment');
var React = require('react');
var {PropTypes} = React;

var {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Panel
} = require('react-bootstrap/lib');

var Chart = require('components/Chart/Chart.react');
var LabeledStat = require('components/Data/LabeledStat.react');
var Topline = require('components/Data/Topline.react');

var formatDistance = require('utils/formatDistance');
var {
  getGroupingInfo,
  getAggregateDistance,
  groupActivities
} = require('utils/ActivityUtils');

var DAY_IN_MS = 24 * 60 * 60 * 1000;
var WEEK_IN_MS = 7 * DAY_IN_MS;
var MONTH_IN_MS = (DAY_IN_MS * 365) / 12;

var DAILY = 'daily';
var MONTHLY = 'monthly';
var WEEKLY = 'weekly';

/**
 * ProfileYearPanel.react
 * @jsx React.DOM
 */
var ProfileYearPanel = React.createClass({
  displayName: 'ProfileYearPanel',

  propTypes: {
    activities: PropTypes.array.isRequired,
    year: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  },

  getInitialState: function() {
    return {
      selectedGraph: WEEKLY
    };
  },

  render: function() {
    return (
      <Panel
        className="profileYear"
        header={this.props.year}>
        <ListGroup fill>
          <ListGroupItem>
            {this._renderChart()}
          </ListGroupItem>
          <ListGroupItem>
            {this._renderToplineStats()}
          </ListGroupItem>
        </ListGroup>
      </Panel>
    );
  },

  _renderChart: function() {
    var {activities, year} = this.props;
    var groupedActivities;
    var interval;

    switch (this.state.selectedGraph) {
      case MONTHLY:
        groupedActivities = groupActivities.byMonth(activities);
        interval = MONTH_IN_MS;
        break;
      case WEEKLY:
        groupedActivities = groupActivities.byWeek(activities);
        interval = WEEK_IN_MS;
        break;
      case DAILY:
        groupedActivities = groupActivities.byDay(activities);
        interval = DAY_IN_MS;
        break;
    }

    var data = [];
    _.each(groupedActivities, (activities) => {
      data.push(getAggregateDistance(activities));
    });

    return (
      <Chart
        height={200}
        series={[{data: data}]}
        type="column"
        options={{
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
        }}
      />
    );
  },

  _renderToplineStats: function() {
    var {miles, run_count, duration} = getGroupingInfo(this.props.activities);

    var duration = moment.duration(duration, 'seconds');
    var durationString =
      duration.days() + 'd ' +
      duration.hours() + 'h ' +
      duration.minutes() + 'm ' +
      duration.seconds() + 's';

    return (
      <Topline>
        <LabeledStat label="Miles" stat={miles} />
        <LabeledStat label="Runs" stat={run_count} />
        <LabeledStat label="Time" stat={durationString} />
      </Topline>
    );
  },

  _renderActions: function() {
    var selectedGraph = this.state.selectedGraph;
    return (
      <ButtonGroup bsSize="small">
        <Button
          active={selectedGraph === DAILY}
          onClick={this._onChartTypeClick.bind(null, DAILY)}>
          Daily
        </Button>
        <Button
          active={selectedGraph === WEEKLY}
          onClick={this._onChartTypeClick.bind(null, WEEKLY)}>
          Weekly
        </Button>
        <Button
          active={selectedGraph === MONTHLY}
          onClick={this._onChartTypeClick.bind(null, MONTHLY)}>
          Monthly
        </Button>
      </ButtonGroup>
    );
  },

  _onChartTypeClick: function(type) {
    this.setState({selectedGraph: type});
  }
});

module.exports = ProfileYearPanel;
