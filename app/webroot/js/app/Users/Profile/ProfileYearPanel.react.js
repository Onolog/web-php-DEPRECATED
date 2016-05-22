var moment = require('moment');
var React = require('react');
var {PropTypes} = React;
var {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Panel,
} = require('react-bootstrap');

var Chart = require('components/Chart/Chart.react');
var Topline = require('components/Topline/Topline.react');

var {forEach} = require('lodash');
var {
  getGroupingInfo,
  getAggregateDistance,
  groupActivities,
} = require('utils/ActivityUtils');

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;
const MONTH_IN_MS = (DAY_IN_MS * 365) / 12;

const DAILY = 'daily';
const MONTHLY = 'monthly';
const WEEKLY = 'weekly';

/**
 * ProfileYearPanel.react
 */
var ProfileYearPanel = React.createClass({
  displayName: 'ProfileYearPanel',

  propTypes: {
    activities: PropTypes.array.isRequired,
    year: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  },

  getInitialState: function() {
    return {
      selectedGraph: WEEKLY,
    };
  },

  render: function() {
    return (
      <Panel
        className="profileYear"
        header={<h3>{this.props.year}</h3>}>
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
    forEach(groupedActivities, (activities) => {
      data.push(getAggregateDistance(activities));
    });

    return (
      <Chart
        height={200}
        options={{
          plotOptions: {
            series: {
              pointStart: Date.UTC(year, 0, 1),
              pointInterval: interval,
            },
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
              month: '%b',
            },
          },
        }}
        series={[{data: data}]}
        type="column"
      />
    );
  },

  _renderToplineStats: function() {
    var {miles, run_count, duration} = getGroupingInfo(this.props.activities);

    duration = moment.duration(duration, 'seconds');
    var durationString =
      duration.days() + 'd ' +
      duration.hours() + 'h ' +
      duration.minutes() + 'm ' +
      duration.seconds() + 's';

    return (
      <Topline>
        <Topline.Item label="Miles">{miles}</Topline.Item>
        <Topline.Item label="Runs">{run_count}</Topline.Item>
        <Topline.Item label="Time">{durationString}</Topline.Item>
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
  },
});

module.exports = ProfileYearPanel;
