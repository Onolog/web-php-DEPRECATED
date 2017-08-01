import moment from 'moment';
import {Panel} from 'react-bootstrap';
import React from 'react';

import BarGraph from 'components/Graph/BarGraph/BarGraph.react';
import BarGraphBar from 'components/Graph/BarGraph/BarGraphBar.react';
import BarGraphSection from 'components/Graph/BarGraph/BarGraphSection.react';
import BarGraphSectionUnit from 'components/Graph/BarGraph/BarGraphSectionUnit.react';
import BaseAppPage from 'components/Page/BaseAppPage.react';
import FBImage from 'components/Facebook/FBImage.react';
import Link from 'components/Link/Link.react';
import Middot from 'components/Middot.react';
import Topline from 'components/Topline/Topline.react';

import formatDistance from 'utils/formatDistance';

const DATE_FORMAT = 'MMMM Do';

/**
 * Report.react
 */
class Report extends React.Component {
  static displayName = 'Report';

  constructor(props) {
    super(props);
    const {
      runExtremes,
      shoeCount,
      topBrand,
      topFriends,
      totalMiles,
      totalRuns,
      totalTime,
      workoutData,
      workoutDataByWeek,
    } = window.app;

    this.state = {
      runExtremes: runExtremes,
      shoeCount: shoeCount,
      topBrand: topBrand,
      topFriends: topFriends,
      totalMiles: totalMiles,
      totalRuns: totalRuns,
      totalTime: totalTime,
      workoutData: workoutData,
      workoutDataByWeek: workoutDataByWeek,
    };
  }

  render() {
    let content;
    const {workoutData} = this.state;
    // Render an empty state when there's no workout data
    if (!(workoutData && workoutData.run_count)) {
      content =
        <Panel className="clearfix emptyState">
          No runs this year. Get back out there!
        </Panel>;
    } else {
      content =
        <Panel className="clearfix">
          <div className="YIRStats">
            {this._renderTotalStats()}
            {this._renderTimeStats()}
            {this._renderExtremesStats()}
            {this._renderShoeStats()}
            {this._renderTopFriendsTable()}
          </div>
          {this._renderGraphs()}
        </Panel>;
    }

    return (
      <BaseAppPage className="report">
        {content}
      </BaseAppPage>
    );
  }

  _renderTotalStats = () => {
    const {totalMiles, totalRuns} = this.state;
    const avgRunDistance = formatDistance(totalMiles / totalRuns);

    return (
      <Topline>
        <Topline.Item label="Runs">
          {totalRuns}
        </Topline.Item>
        <Topline.Item
          annotation={`Avg. ${avgRunDistance} miles/run`}
          label="Miles">
          {totalMiles}
        </Topline.Item>
      </Topline>
    );
  };

  _renderTimeStats = () => {
    var duration = moment.duration(this.state.totalTime, 'seconds');
    var durationString =
      duration.days() + 'd ' +
      duration.hours() + 'h ' +
      duration.minutes() + 'm ' +
      duration.seconds() + 's';

    return (
      <Topline className="fullWidth">
        <Topline.Item label="Time Spent Running">
          {durationString}
        </Topline.Item>
      </Topline>
    );
  };

  _renderExtremesStats = () => {
    const {totalRuns, runExtremes} = this.state;
    if (totalRuns < 2) {
      return;
    }

    return (
      <Topline>
        <Topline.Item
          annotation={moment(runExtremes.max.date*1000).format(DATE_FORMAT)}
          label="Longest Run (Miles)">
          {runExtremes.max.distance}
        </Topline.Item>
        <Topline.Item
          annotation={moment(runExtremes.min.date*1000).format(DATE_FORMAT)}
          label="Shortest Run (Miles)">
          {runExtremes.min.distance}
        </Topline.Item>
      </Topline>
    );
  };

  _renderShoeStats = () => {
    const {shoeCount, topBrand} = this.state;
    if (!shoeCount) {
      return;
    }

    return (
      <Topline>
        <Topline.Item label="Pairs of shoes used">
          {shoeCount}
        </Topline.Item>
        <Topline.Item
          annotation={`${topBrand.count} pairs`}
          label="Favorite Brand">
          {topBrand.name}
        </Topline.Item>
      </Topline>
    );
  };

  _renderTopFriendsTable = () => {
    // Only show the top 5 friends
    var topFriends = this.state.topFriends.slice(0, 5);
    var friends = topFriends.map(function(friend) {
      var runs = friend.runs;
      var totalMiles = runs.reduce(function(prevVal, currVal) {
        return +prevVal + +currVal;
      });

      return (
        <tr key={friend.id}>
          <td className="topFriendsPhoto">
            <Link
              className="innerBorder"
              href={'/users/profile/' + friend.id}>
              <FBImage fbid={friend.id} />
            </Link>
          </td>
          <td className="topFriendsInfo">
            {friend.name}
            <div className="topFriendsData">
              {runs.length + ' runs'}
              <Middot />
              {formatDistance(totalMiles) + ' miles'}
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="topFriends">
        <h4 className="sectionHeader">
          Top Running Partners
        </h4>
        <table className="topFriendsTable">{friends}</table>
      </div>
    );
  };

  _renderGraphs = () => {
    return (
      <div className="YIRGraphContainer">
        <div className="YIRGraph dailyGraph">
          <h4 className="sectionHeader">
            Daily Mileage
          </h4>
          {this._renderDailyGraph()}
        </div>
        <div className="YIRGraph weeklyGraph">
          <h4 className="sectionHeader">
            Weekly Mileage
          </h4>
          {this._renderWeeklyGraph()}
        </div>
        <div className="YIRGraph">
          <h4 className="sectionHeader">
            Monthly Mileage
          </h4>
          {this._renderMonthlyGraph()}
        </div>
      </div>
    );
  };

  _renderDailyGraph = () => {
    var monthData = this.state.workoutData.months;
    var monthKeys = Object.keys(monthData);
    var months = monthKeys.map(monthKey => {
      var month = monthData[monthKey];
      var monthName = moment({
        years: month.year,
        months: month.month-1,
      }).format('MMM');
      var metadata = month.run_count + ' runs';

      var dayData = month.days;
      var dayKeys = Object.keys(dayData);
      var days = dayKeys.map(dayKey => {
        var day = dayData[dayKey];
        return (
          <BarGraphSectionUnit key={dayKey}>
            <BarGraphBar
              label={day.miles + ' miles'}
              scale={1.15}
              value={day.miles}
            />
          </BarGraphSectionUnit>
        );
      });

      return (
        <BarGraphSection
          key={month.year + month.month}
          label={monthName}
          metadata={metadata}>
          {days}
        </BarGraphSection>
      );
    });

    return <BarGraph>{months}</BarGraph>;
  };

  _renderWeeklyGraph = () => {
    var weekData = this.state.workoutDataByWeek.weeks;
    var keys = Object.keys(weekData).sort();
    var weeks = keys.map(key => {
      var week = weekData[key];
      var label = week.week < 10 ? '0' + week.week : '' + week.week;

      return (
        <BarGraphSection
          key={week.year + week.week}
          label={label}>
          <BarGraphSectionUnit>
            <BarGraphBar
              label={week.miles + ' miles'}
              scale={1.2}
              value={week.miles}
            />
          </BarGraphSectionUnit>
        </BarGraphSection>
      );
    });

    return <BarGraph>{weeks}</BarGraph>;
  };

  _renderMonthlyGraph = () => {
    var monthData = this.state.workoutData.months;
    var keys = Object.keys(monthData);
    var months = keys.map(key => {
      var month = monthData[key];
      var monthName = moment({
        years: month.year,
        months: month.month-1,
      }).format('MMM');
      var metadata = month.run_count + ' runs';

      return (
        <BarGraphSection
          key={month.year + month.month}
          label={monthName}
          metadata={metadata}>
          <BarGraphSectionUnit>
            <BarGraphBar
              label={month.miles + ' miles'}
              scale={0.5}
              value={month.miles}
            />
          </BarGraphSectionUnit>
        </BarGraphSection>
      );
    });

    return <BarGraph>{months}</BarGraph>;
  };
}

module.exports = Report;
