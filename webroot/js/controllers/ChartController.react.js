import moment from 'moment';
import React from 'react';
import {Panel} from 'react-bootstrap';

import ActivityChart from 'components/Data/ActivityChart.react';
import AppPage from 'components/Page/AppPage.react';
import AreaChart from 'components/Data/AreaChart.react';
import BarChart from 'components/Data/BarChart.react';
import LineChart from 'components/Data/LineChart.react';
import PageHeader from 'components/Page/PageHeader.react';
import ScatterChart from 'components/Data/ScatterChart.react';

import {metersToFeet, metersToMiles} from 'utils/distanceUtils';
import speedToPace from 'utils/speedToPace';

import {ACTIVITY_METRICS} from 'constants/TestData';

const HEIGHT = 300;
const METRICS = {
  SUM_ELAPSED_DURATION: 0,
  LATITUDE: 1,
  SUM_MOVING_DURATION: 2,
  ELEVATION: 3,
  HEART_RATE: 4,
  SUM_DURATION: 5,
  SUM_DISTANCE: 6,
  TIMESTAMP: 7,
  SPEED: 8,
  LONGITUDE: 9,
};

const monthMiles = [107, 125, 156, 210, 184, 107, 125, 156, 210, 184, 30, 24];
const monthData = monthMiles.map((miles, month) => ({
  xVal: month,
  yVal: miles,
}));

const weekMiles = [
  27.87, 1.49, 0, 18.03, 35.26, 20.43, 40.03, 14.17, 40.49, 55.03,
  36.01, 33.64, 56.15, 47.86, 62.74, 51.54, 58.04, 40.05, 82.78, 0,
  22.02, 0, 6.64, 7.17, 6.33, 0, 8.37, 15.35, 0, 24.16, 0, 13.88, 18.65,
  23.01, 21.02, 10.82, 20.34, 5.21, 10.03, 12.02, 17.11, 13.08, 22.04,
  29.8, 21.36, 36.51, 33.53, 37.26, 41.52, 23.08, 45.08, 47.57,
];

const weekData = weekMiles.map((miles, week) => ({
  xVal: week + 1,
  yVal: miles,
}));

let elevationData = [];
let heartRateData = [];
let paceData = [];

ACTIVITY_METRICS.forEach(({metrics}) => {
  const sumDistance = metersToMiles(metrics[METRICS.SUM_DISTANCE]);

  elevationData.push({
    x: sumDistance,
    y: metersToFeet(metrics[METRICS.ELEVATION]),
  });

  heartRateData.push({
    x: sumDistance,
    y: metrics[METRICS.HEART_RATE],
  });

  const pace = speedToPace(metrics[METRICS.SPEED]);
  paceData.push({
    x: sumDistance,
    y: pace > 960 ? 960 : pace, // Compress outlying data
  });
});

/**
 * ChartController.react
 *
 * Static page for testing data & charting libs.
 */
class ChartController extends React.Component {
  render() {
    return (
      <AppPage>
        <PageHeader title="Data" />
        <Panel header={<h3>Month Data</h3>}>
          <BarChart
            data={monthData}
            height={HEIGHT}
            tooltip={data => (`
              <strong>${moment().month(data.xVal).format('MMMM')}</strong>
              <div>${data.yVal} Miles</div>
            `)}
            xFormat={m => moment().month(m).format('MMM')}
          />
        </Panel>
        <Panel header={<h3>Week Data</h3>}>
          <BarChart
            data={weekData}
            height={HEIGHT}
            tooltip={data => (`
              <strong>Week ${moment().week(data.xVal).format('w')}</strong>
              <div>${data.yVal} Miles</div>
            `)}
            xFormat={w => moment().week(w).format('ww')}
          />
        </Panel>
        <Panel>
          <LineChart
            data={weekData}
            dots
            height={HEIGHT}
            tooltip={data => (`
              <strong>Week ${moment().week(data.xVal).format('w')}</strong>
              <div>${data.yVal} Miles</div>
            `)}
            xFormat={w => moment().week(w).format('ww')}
          />
        </Panel>
        <Panel>
          <AreaChart
            data={weekData}
            height={HEIGHT}
            tooltip={data => (`
              <strong>Week ${moment().week(data.xVal).format('w')}</strong>
              <div>${data.yVal} Miles</div>
            `)}
            xFormat={w => moment().week(w).format('ww')}
          />
        </Panel>
        <Panel>
          <ScatterChart
            data={weekData}
            height={HEIGHT}
            tooltip={data => (`
              <strong>Week ${moment().week(data.xVal).format('w')}</strong>
              <div>${data.yVal} Miles</div>
            `)}
            xFormat={w => moment().week(w).format('ww')}
          />
        </Panel>
        <Panel>
          <ActivityChart
            elevationData={elevationData}
            heartRateData={heartRateData}
            paceData={paceData}
          />
        </Panel>
      </AppPage>
    );
  }
}

module.exports = ChartController;
