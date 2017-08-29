import * as d3 from 'd3';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap';

import BarChart from 'components/Data/BarChart.react';
import LeftRight from 'components/LeftRight/LeftRight.react';
import Topline from 'components/Topline/Topline.react';
import WeeklyMileageChart from 'components/Data/WeeklyMileageChart.react';

import {map} from 'lodash';
import {
  getGroupingInfo,
  getAggregateDistance,
  groupActivities,
} from 'utils/ActivityUtils';

const HEIGHT = 200;

const DAILY = 'daily';
const MONTHLY = 'monthly';
const WEEKLY = 'weekly';

/**
 * ProfileYearPanel.react
 */
class ProfileYearPanel extends React.Component {
  static displayName = 'ProfileYearPanel';

  static propTypes = {
    activities: PropTypes.array.isRequired,
    year: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  };

  state = {
    selectedGraph: WEEKLY,
  };

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
  }

  _renderChart = () => {
    const {activities, year} = this.props;

    let groupedActivities;
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
        const data = d3.nest()
          .key(d => moment.tz(d.start_date, d.timezone).week())
          .rollup(values => d3.sum(values, v => v.distance))
          .entries(activities);

        return (
          <WeeklyMileageChart
            data={data}
            height={HEIGHT}
            year={year}
          />
        );
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
  };

  _renderToplineStats = () => {
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
  };

  _renderActions = () => {
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
  };

  _onChartTypeClick = selectedGraph => {
    this.setState({selectedGraph});
  };
}

export default ProfileYearPanel;
