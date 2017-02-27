import React from 'react';
import {Tab, Tabs} from 'react-bootstrap/lib';

import AppFullPage from 'components/Page/AppFullPage.react';
import DistanceTable from 'components/Vdot/DistanceTable.react';
import PaceTable from 'components/Vdot/PaceTable.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';

import 'components/Vdot/Daniels.css';

const TITLE = 'Daniels VDOT Resources';

/**
 * VdotController.react
 *
 * Displays Daniels VDOT data.
 */
const DanielsController = props => (
  <AppFullPage className="daniels" title={TITLE}>
    <PageHeader full title={TITLE} />
    <PageFrame scroll>
      <Tabs defaultActiveKey={1} id="vdot">
        <Tab
          eventKey={1}
          title="Distance Table">
          <h4>
            VDOT Values Associated with Times Raced Over Popular Distances
          </h4>
          <DistanceTable />
        </Tab>
        <Tab
          eventKey={2}
          title="Training Intensities">
          <h4>Training Intensities Based on Current VDOT</h4>
          <PaceTable />
        </Tab>
      </Tabs>
    </PageFrame>
  </AppFullPage>
);

module.exports = DanielsController;
