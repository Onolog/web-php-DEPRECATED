import moment from 'moment';
import React, {PropTypes} from 'react';
import {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap';

import BarChart from 'components/D3/BarChart.react';
import LeftRight from 'components/LeftRight/LeftRight.react';
import Topline from 'components/Topline/Topline.react';

import {forEach, map} from 'lodash';
import {
  getGroupingInfo,
  getAggregateDistance,
  groupActivities,
} from 'utils/ActivityUtils';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEK_IN_MS = 7 * DAY_IN_MS;
const MONTH_IN_MS = (DAY_IN_MS * 365) / 12;

const HEIGHT = 200;

const DAILY = 'daily';
const MONTHLY = 'monthly';
const WEEKLY = 'weekly';

/**
 * ProfileYearPanel.react
 */
const ProfileYearPanel = React.createClass({
  displayName: 'ProfileYearPanel',

  propTypes: {
    activities: PropTypes.array.isRequired,
    year: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  },

  getInitialState() {
    return {
      selectedGraph: WEEKLY,
    };
  },

  render() {
    return (
      <Panel
        className="profileYear"
        header={
          <h3>
            <LeftRight>
              {this.props.year}
              {this._renderActions()}
            </LeftRight>
          </h3>
        }>
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

  _renderChart() {
    const {activities, year} = this.props;

    let groupedActivities;
    let interval;
    let tooltip;
    let xFormat;

    switch (this.state.selectedGraph) {
      case MONTHLY:
        groupedActivities = groupActivities.byMonth(activities);
        tooltip = data => (`
          ${moment().month(data.xVal).year(year).format('MMMM YYYY')}
          <div>${data.yVal} Miles</div>
        `);
        xFormat = m => moment().month(m).format('MMM');
        break;
      case WEEKLY:
        groupedActivities = groupActivities.byWeek(activities);
        tooltip = data => {
          const m = moment().week(data.xVal).year(year);
          return `
            ${m.format('MMM D')} &ndash; ${m.add(6, 'days').format('MMM D')}
            <div>${data.yVal} Miles</div>
          `;
        };
        xFormat = w => moment().week(w).format('ww');
        break;
      case DAILY:
        groupedActivities = groupActivities.byDay(activities);
        break;
    }

    const data = map(groupedActivities, (activities, idx) => {
      return {
        xVal: idx,
        yVal: getAggregateDistance(activities),
      };
    });

    return (
      <BarChart
        data={data}
        height={HEIGHT}
        tooltip={tooltip}
        xFormat={xFormat}
      />      
    );
  },

  _renderToplineStats() {
    const {miles, run_count, duration} = getGroupingInfo(this.props.activities);
    const m = moment.duration(duration, 'seconds');
    const durationString =
      `${m.days()}d ${m.hours()}h ${m.minutes()}m ${m.seconds()}s`;

    return (
      <Topline>
        <Topline.Item label="Miles">{miles}</Topline.Item>
        <Topline.Item label="Runs">{run_count}</Topline.Item>
        <Topline.Item label="Time">{durationString}</Topline.Item>
      </Topline>
    );
  },

  _renderActions() {
    const {selectedGraph} = this.state;
    return (
      <ButtonGroup bsSize="xsmall" className="chart-type-selector">
        {/*
        <Button
          active={selectedGraph === DAILY}
          onClick={() => this._onChartTypeClick(DAILY)}>
          Daily
        </Button>
        */}
        <Button
          active={selectedGraph === WEEKLY}
          onClick={() => this._onChartTypeClick(WEEKLY)}>
          Weekly
        </Button>
        <Button
          active={selectedGraph === MONTHLY}
          onClick={() => this._onChartTypeClick(MONTHLY)}>
          Monthly
        </Button>
      </ButtonGroup>
    );
  },

  _onChartTypeClick(type) {
    this.setState({selectedGraph: type});
  },
});

export default ProfileYearPanel;
