import moment from 'moment';
import React from 'react';
import {Panel} from 'react-bootstrap';

import AppPage from 'components/Page/AppPage.react';
import BarChart from 'components/D3/BarChart.react';
import PageHeader from 'components/Page/PageHeader.react';

const HEIGHT = 300;

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

/**
 * ChartController.react
 *
 * Static page for testing data & charting libs.
 */
class DataPage extends React.Component {
  static displayName = 'DataPage';

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
      </AppPage>
    );
  }
}

module.exports = DataPage;
